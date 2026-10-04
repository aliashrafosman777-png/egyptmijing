'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Home() {
  const { t } = useLanguage();

  const journeys = [
    { placeKey: 'home.journey.siwa.place', labelKey: 'home.journey.siwa.label', image: '/images/siwa-palms.webp', noteKey: 'home.journey.siwa.note' },
    { placeKey: 'home.journey.white.place', labelKey: 'home.journey.white.label', image: '/images/white-desert.webp', noteKey: 'home.journey.white.note' },
    { placeKey: 'home.journey.dendera.place', labelKey: 'home.journey.dendera.label', image: '/images/dendera-ceiling.webp', noteKey: 'home.journey.dendera.note' },
  ];

  return (
    <main>
      <section className="hero">
        <Image src="/images/siwa-palms.webp" alt="Siwa Oasis at sunset, with palm groves below the desert plateau" fill priority className="hero-image" sizes="100vw" />
        <div className="hero-shade" /><div className="hero-grain" />
        <div className="hero-content shell">
          <p className="eyebrow light">{t('home.hero.eyebrow')}</p>
          <h1>{t('home.hero.h1a')}<span>{t('home.hero.h1b')}</span></h1>
          <p className="hero-copy">{t('home.hero.copy')}</p>
          <div className="hero-actions">
            <Link href="/work" className="button gold">{t('home.hero.cta')} <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/about" className="text-link light-link">{t('home.hero.link')} <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <a className="scroll-cue" href="#discovery" aria-label="Scroll to discover">{t('home.hero.scroll')} <ArrowDown size={15} aria-hidden="true" /></a>
        <div className="hero-index" aria-hidden="true">{t('home.hero.index')}</div>
      </section>

      <div className="home-story">
        <section className="intro-section" id="discovery">
          <div className="shell intro-grid">
            <div><p className="eyebrow">{t('home.intro.eyebrow')}</p><h2>{t('home.intro.h2a')}<br />{t('home.intro.h2b')}</h2></div>
            <div className="intro-copy"><p>{t('home.intro.copy')}</p><Link href="/about" className="text-link">{t('home.intro.link')} <span>→</span></Link></div>
          </div>
        </section>

        <section className="journeys-section">
          <div className="shell section-heading">
            <div><p className="eyebrow light">{t('home.journeys.eyebrow')}</p><h2>{t('home.journeys.h2')}</h2></div>
            <p>{t('home.journeys.copy')}</p>
          </div>
          <div className="journey-list">
            {journeys.map((journey, index) => (
              <article className="journey-card" key={journey.placeKey}>
                <Image src={journey.image} alt={t(journey.placeKey)} fill sizes="(max-width: 760px) 100vw, 34vw" />
                <div className="journey-overlay" />
                <span className="journey-number">0{index + 1}</span>
                <div className="journey-copy"><p>{t(journey.labelKey)}</p><h3>{t(journey.placeKey)}</h3><span>{t(journey.noteKey)}</span></div>
              </article>
            ))}
          </div>
          <div className="center-link"><Link href="/work" className="button outline-light">{t('home.journeys.viewAll')} <span>→</span></Link></div>
        </section>

        <section className="principles-section">
          <div className="shell principles-grid">
            <div><p className="eyebrow">{t('home.principles.eyebrow')}</p><h2>{t('home.principles.h2')}</h2></div>
            <div className="principles-list">
              <div><span>01</span><h3>{t('home.principles.1.h3')}</h3><p>{t('home.principles.1.p')}</p></div>
              <div><span>02</span><h3>{t('home.principles.2.h3')}</h3><p>{t('home.principles.2.p')}</p></div>
              <div><span>03</span><h3>{t('home.principles.3.h3')}</h3><p>{t('home.principles.3.p')}</p></div>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
