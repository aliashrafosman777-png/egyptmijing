'use client';

import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="contact-hero"><div className="contact-symbol" aria-hidden="true">𓂀</div><div className="shell contact-grid contact-grid-solo"><div><p className="eyebrow light">{t('contact.hero.eyebrow')}</p><h1>{t('contact.hero.h1a')}<br /><span>{t('contact.hero.h1b')}</span></h1></div></div></section>
      <section className="contact-line-section">
        <div className="shell">
          <a
            className="line-contact-card"
            href="https://lin.ee/VHouqpp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.line.aria')}
          >
            <div className="line-contact-copy">
              <p className="eyebrow light">{t('contact.line.eyebrow')}</p>
              <h2>{t('contact.line.h2')}</h2>
              <p>{t('contact.line.copy')}</p>
              <span className="line-contact-action">
                <span className="line-contact-icon" aria-hidden="true"><MessageCircle size={21} strokeWidth={1.8} /></span>
                {t('contact.line.cta')}
              </span>
            </div>
            <span className="line-contact-wordmark" aria-hidden="true">LINE</span>
          </a>
        </div>
      </section>
    </main>
  );
}
