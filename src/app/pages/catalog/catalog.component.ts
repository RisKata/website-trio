import { afterNextRender, Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getDocument, type PDFDocumentProxy } from 'pdfjs-dist';
import { WorkerMessageHandler } from 'pdfjs-dist/build/pdf.worker.min.mjs';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

const PDF_FILE = 'catalog/TRIO PRODUCT CATALOGUE.pdf';
const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

type FitMode = 'page' | 'width';

/** PDF.js waits forever when this method is missing, which leaves the preview spinning. */
function ensurePromiseTry(): void {
  const promiseApi = Promise as PromiseConstructor & {
    try?: (callback: (...args: unknown[]) => unknown, ...args: unknown[]) => Promise<unknown>;
  };

  if (typeof promiseApi.try === 'function') {
    return;
  }

  promiseApi.try = (callback, ...args) => new Promise(resolve => {
    resolve(callback(...args));
  });
}

ensurePromiseTry();

/** Resolves a site file against `<base href>`, including the GitHub Pages prefix. */
function assetUrl(path: string): string {
  return new URL(path, document.baseURI).href;
}

// Draw the pages in the page itself. A separate PDF worker never finishes
// starting in this app, so the preview stays on the loading message.
(globalThis as typeof globalThis & {
  pdfjsWorker?: { WorkerMessageHandler: typeof WorkerMessageHandler };
}).pdfjsWorker = { WorkerMessageHandler };

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  private readonly i18n = inject(TranslationService);
  private readonly stageRef = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('pageCanvas');

  readonly pdfPath = encodeURI(PDF_FILE);
  readonly pdfName = 'TRIO PRODUCT CATALOGUE.pdf';
  readonly loading = signal(true);
  readonly failed = signal(false);
  readonly page = signal(1);
  readonly pageCount = signal(0);
  readonly fit = signal<FitMode>('page');
  readonly zoom = signal(1);
  readonly zoomPercent = computed(() => Math.round(this.zoom() * 100));
  readonly canZoomOut = computed(() => this.zoom() > ZOOM_STEPS[0]);
  readonly canZoomIn = computed(() => this.zoom() < ZOOM_STEPS[ZOOM_STEPS.length - 1]);

  private destroyed = false;
  private pdf: PDFDocumentProxy | null = null;
  private renderToken = 0;
  private lastDrawKey = '';
  private renderTask: { cancel: () => void; promise: Promise<unknown> } | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private stageElement: HTMLElement | null = null;
  private swipeStart: { x: number; y: number; pointerId: number } | null = null;
  private readonly onTouchMove = (event: TouchEvent): void => {
    const start = this.swipeStart;
    if (!start || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const stage = this.stageRef().nativeElement;
    const canPanSideways = stage.scrollWidth > stage.clientWidth + 2;
    if (!canPanSideways && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      event.preventDefault();
    }
  };

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.renderTask?.cancel();
      this.resizeObserver?.disconnect();
      this.stageElement?.removeEventListener('touchmove', this.onTouchMove);
      void this.pdf?.destroy();
    });

    afterNextRender(() => {
      const stage = this.stageRef().nativeElement;
      this.stageElement = stage;
      this.resizeObserver = new ResizeObserver(() => {
        void this.drawPage();
      });
      this.resizeObserver.observe(stage);
      stage.addEventListener('touchmove', this.onTouchMove, { passive: false });
      void this.openPdf();
    });
  }

  beginSwipe(event: PointerEvent): void {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    this.swipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
    try {
      this.stageRef().nativeElement.setPointerCapture(event.pointerId);
    } catch {
      // The pointer can already be gone on a very fast tap.
    }
  }

  endSwipe(event: PointerEvent): void {
    const start = this.swipeStart;
    this.swipeStart = null;
    if (!start || start.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.25) {
      return;
    }

    const stage = this.stageRef().nativeElement;
    if (stage.scrollWidth > stage.clientWidth + 2) {
      const atStart = stage.scrollLeft <= 1;
      const atEnd = stage.scrollLeft + stage.clientWidth >= stage.scrollWidth - 1;
      if (dx < 0 && !atEnd) {
        return;
      }
      if (dx > 0 && !atStart) {
        return;
      }
    }

    this.changePage(dx < 0 ? 1 : -1);
  }

  cancelSwipe(): void {
    this.swipeStart = null;
  }

  changePage(delta: number): void {
    const next = this.page() + delta;
    if (next < 1 || next > this.pageCount()) {
      return;
    }

    this.page.set(next);
    const stage = this.stageRef().nativeElement;
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    void this.drawPage();
  }

  changeZoom(direction: -1 | 1): void {
    const index = ZOOM_STEPS.findIndex(step => step === this.zoom());
    const current = index === -1 ? ZOOM_STEPS.indexOf(1) : index;
    const next = Math.min(ZOOM_STEPS.length - 1, Math.max(0, current + direction));
    this.zoom.set(ZOOM_STEPS[next]);
    void this.drawPage();
  }

  setFit(mode: FitMode): void {
    this.fit.set(mode);
    this.zoom.set(1);
    const stage = this.stageRef().nativeElement;
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    void this.drawPage();
  }

  private async openPdf(): Promise<void> {
    try {
      const pdf = await getDocument({
        url: assetUrl(this.pdfPath),
        cMapUrl: assetUrl('pdfjs/cmaps/'),
        cMapPacked: true,
        standardFontDataUrl: assetUrl('pdfjs/standard_fonts/'),
        wasmUrl: assetUrl('pdfjs/wasm/')
      }).promise;

      if (this.destroyed) {
        await pdf.destroy();
        return;
      }

      this.pdf = pdf;
      this.pageCount.set(pdf.numPages);
      this.loading.set(false);
      await new Promise(resolve => requestAnimationFrame(resolve));
      await this.drawPage();
    } catch {
      if (!this.destroyed) {
        this.loading.set(false);
        this.failed.set(true);
      }
    }
  }

  private async drawPage(): Promise<void> {
    const pdf = this.pdf;
    if (!pdf || this.destroyed) {
      return;
    }

    const stage = this.stageRef().nativeElement;
    const style = getComputedStyle(stage);
    const availW = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 8;
    const availH = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 8;
    if (availW < 2 || availH < 2) {
      return;
    }

    const key = `${this.page()}|${this.fit()}|${this.zoom()}|${availW}|${availH}`;
    if (key === this.lastDrawKey) {
      return;
    }

    this.lastDrawKey = key;
    const token = ++this.renderToken;
    this.renderTask?.cancel();

    try {
      const pdfPage = await pdf.getPage(this.page());
      if (token !== this.renderToken || this.destroyed) {
        return;
      }

      const base = pdfPage.getViewport({ scale: 1 });
      const fitted = this.fit() === 'page'
        ? Math.min(availW / base.width, availH / base.height)
        : availW / base.width;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = pdfPage.getViewport({ scale: fitted * this.zoom() * pixelRatio });
      const canvas = this.canvasRef().nativeElement;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / pixelRatio)}px`;
      canvas.style.height = `${Math.floor(viewport.height / pixelRatio)}px`;
      canvas.setAttribute('aria-label', `${this.i18n.t('catalog.preview')} ${this.page()}`);

      const task = pdfPage.render({ canvas, viewport });
      this.renderTask = task;
      await task.promise;
      pdfPage.cleanup();
    } catch (error) {
      if (token !== this.renderToken || this.destroyed || this.isCancelled(error)) {
        return;
      }

      this.lastDrawKey = '';
      this.failed.set(true);
    }
  }

  private isCancelled(error: unknown): boolean {
    return error instanceof Error && error.name === 'RenderingCancelledException';
  }
}
