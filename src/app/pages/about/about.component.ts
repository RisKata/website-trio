import { AfterViewInit, Component, ElementRef, OnDestroy, inject } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { AnimateOnScrollDirective } from '../../shared/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, AnimateOnScrollDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private frame?: number;

  readonly stats = [
    { target: 35, value: 0 },
    { target: 50, value: 0 },
    { target: 200, value: 0 }
  ];

  ngAfterViewInit(): void {
    const statsEl = this.host.nativeElement.querySelector('.about-stats');
    if (!statsEl) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.setFinalValues();
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        this.animate();
        this.observer?.disconnect();
      },
      { threshold: 0.4 }
    );
    this.observer.observe(statsEl);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
    }
  }

  private animate(): void {
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      for (const stat of this.stats) {
        stat.value = Math.round(stat.target * eased);
      }

      if (progress < 1) {
        this.frame = requestAnimationFrame(tick);
      }
    };

    this.frame = requestAnimationFrame(tick);
  }

  private setFinalValues(): void {
    for (const stat of this.stats) {
      stat.value = stat.target;
    }
  }
}
