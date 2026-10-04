'use client';

import Image from 'next/image';
import Link from 'next/link';
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
          <Link href="/">{t('nav.home')}</Link><Link href="/about">{t('nav.about')}</Link><Link href="/work">{t('nav.work')}</Link><Link href="/itinerary">{t('nav.itinerary')}</Link><Link href="/contact">{t('nav.contact')}</Link>
        </div>
        <div>
          <p className="footer-label">{t('footer.begin')}</p>
          <p className="footer-note">{t('footer.beginNote')}</p>
          <Link href="/contact" className="text-link footer-link">{t('footer.planLink')} <span>→</span></Link>
        </div>
      </div>
      <div className="shell footer-base">
        <span>{t('footer.copyright')}</span>
        <span className="photo-credit">Photography: <a href="https://commons.wikimedia.org/wiki/File:SIWA_PALMS.jpg">Hesham Farouk Ragab</a> · <a href="https://commons.wikimedia.org/wiki/File:White_Desert,_Egypt.jpg">Vyacheslav Argenberg</a></span>
      </div>
    </footer>
  );
}
