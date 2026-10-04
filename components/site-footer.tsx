'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/brand/egypt-hidden-wonders-logo.png" alt="Egypt Hidden Wonders" width={280} height={255} />
          <p>{t('footer.tagline')}</p>
        </div>
        <div>
          <p className="footer-label">{t('footer.explore')}</p>
          <a href="/">{t('nav.home')}</a><a href="/about">{t('nav.about')}</a><a href="/work">{t('nav.work')}</a><a href="/itinerary">{t('nav.itinerary')}</a><a href="/contact">{t('nav.contact')}</a>
        </div>
        <div>
          <p className="footer-label">{t('footer.begin')}</p>
          <p className="footer-note">{t('footer.beginNote')}</p>
          <a href="/contact" className="text-link footer-link">{t('footer.planLink')} <span>→</span></a>
        </div>
      </div>
      <div className="shell footer-base">
        <span>{t('footer.copyright')}</span>
        <span className="photo-credit">Photography: <a href="https://commons.wikimedia.org/wiki/File:SIWA_PALMS.jpg">Hesham Farouk Ragab</a> · <a href="https://commons.wikimedia.org/wiki/File:White_Desert,_Egypt.jpg">Vyacheslav Argenberg</a></span>
      </div>
    </footer>
  );
}
