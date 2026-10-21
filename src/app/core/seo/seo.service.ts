import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslationKey } from '../i18n/translations';
import { TranslationService } from '../i18n/translation.service';
import { findProduct } from '../products/catalog';

export const SITE_ORIGIN = 'https://riskata.github.io/website-trio';

interface SeoPage {
  path: string;
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  navKey: TranslationKey;
}

const PAGES: SeoPage[] = [
  { path: '', titleKey: 'seo.home.title', descriptionKey: 'seo.home.description', navKey: 'nav.home' },
  { path: 'about', titleKey: 'seo.about.title', descriptionKey: 'seo.about.description', navKey: 'nav.about' },
  { path: 'products', titleKey: 'seo.products.title', descriptionKey: 'seo.products.description', navKey: 'nav.products' },
  { path: 'catalog', titleKey: 'seo.catalog.title', descriptionKey: 'seo.catalog.description', navKey: 'nav.catalog' },
  { path: 'horeca', titleKey: 'seo.horeca.title', descriptionKey: 'seo.horeca.description', navKey: 'nav.horeca' },
  { path: 'contact', titleKey: 'seo.contact.title', descriptionKey: 'seo.contact.description', navKey: 'nav.contact' }
];

const LOCALES: Record<string, string> = {
  mk: 'mk_MK',
  en: 'en_US',
  sq: 'sq_AL'
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly i18n = inject(TranslationService);
  constructor() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.apply());
    effect(() => {
      this.i18n.currentLang();
      this.apply();
    });
  }

  private apply(): void {
    const path = this.router.url.split(/[?#]/)[0].replace(/^\//, '').replace(/\/$/, '');
    const productId = path.startsWith('products/') ? path.slice('products/'.length) : '';
    const product = productId ? findProduct(productId) : undefined;
    const page = PAGES.find(item => item.path === path);

    const pageTitle = product
      ? `${this.i18n.t(product.flavors?.[0]?.titleKey ?? product.nameKey)} — Trio 95`
      : this.i18n.t(page?.titleKey ?? 'seo.home.title');
    const description = this.descriptionFor(product, page);
    const url = this.pageUrl(product ? `products/${product.id}` : (page?.path ?? ''));
    const image = product?.images[0]
      ? this.absolute(product.images[0])
      : `${SITE_ORIGIN}/logo.png`;

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Trio 95' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: LOCALES[this.i18n.currentLang()] ?? 'mk_MK' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    const crumbName = product
      ? this.i18n.t(product.flavors?.[0]?.titleKey ?? product.nameKey)
      : this.i18n.t(page?.navKey ?? 'nav.home');
    this.upsertLink('canonical', url);
    this.upsertJsonLd(this.graph(pageTitle, description, url, path, crumbName));
  }

  private descriptionFor(product: ReturnType<typeof findProduct> | undefined, page: SeoPage | undefined): string {
    if (product) {
      const text = this.i18n.t(product.flavors?.[0]?.descKey ?? product.descKey).replace(/\s+/g, ' ').trim();
      const summary = text || this.i18n.t('seo.product.fallback');
      return summary.length <= 160 ? summary : `${summary.slice(0, 157).trimEnd()}…`;
    }
    return this.i18n.t(page?.descriptionKey ?? 'seo.home.description');
  }

  private graph(pageTitle: string, description: string, url: string, path: string, crumbName: string): unknown {
    const crumbs = path
      ? [
          { name: this.i18n.t('nav.home'), url: this.pageUrl('') },
          ...(path.startsWith('products/')
            ? [{ name: this.i18n.t('nav.products'), url: this.pageUrl('products') }]
            : []),
          { name: crumbName, url }
        ]
      : [];

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_ORIGIN}/#organization`,
          name: 'Trio 95',
          alternateName: 'Трио 95',
          url: `${SITE_ORIGIN}/`,
          logo: `${SITE_ORIGIN}/logo.png`,
          email: 'trio_95@t.mk',
          telephone: ['+38948418977', '+38948423279', '+38970934438'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Александар Македонски бб',
            addressLocality: 'Прилеп',
            postalCode: '7500',
            addressCountry: 'MK'
          },
          sameAs: ['https://www.facebook.com/TRIO95DOO/']
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_ORIGIN}/#website`,
          url: `${SITE_ORIGIN}/`,
          name: 'Trio 95',
          inLanguage: ['mk', 'en', 'sq'],
          publisher: { '@id': `${SITE_ORIGIN}/#organization` }
        },
        {
          '@type': 'ItemList',
          '@id': `${SITE_ORIGIN}/#navigation`,
          name: 'Trio 95',
          itemListElement: PAGES.map((item, index) => ({
            '@type': 'SiteNavigationElement',
            position: index + 1,
            name: this.i18n.t(item.navKey),
            url: this.pageUrl(item.path)
          }))
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: pageTitle,
          description,
          inLanguage: this.i18n.currentLang(),
          isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
          about: { '@id': `${SITE_ORIGIN}/#organization` },
          ...(crumbs.length
            ? { breadcrumb: { '@id': `${url}#breadcrumb` } }
            : {})
        },
        ...(crumbs.length
          ? [{
              '@type': 'BreadcrumbList',
              '@id': `${url}#breadcrumb`,
              itemListElement: crumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.name,
                item: crumb.url
              }))
            }]
          : [])
      ]
    };
  }

  private pageUrl(path: string): string {
    return path ? `${SITE_ORIGIN}/${path}` : `${SITE_ORIGIN}/`;
  }

  private absolute(path: string): string {
    return path.startsWith('http') ? path : `${SITE_ORIGIN}/${path.replace(/^\//, '')}`;
  }

  private upsertLink(rel: string, href: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private upsertJsonLd(data: unknown): void {
    let script = this.document.getElementById('seo-jsonld');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'seo-jsonld';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
