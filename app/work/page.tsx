'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

const workKeys = [
  { titleKey: 'work.abusimbel.title', kickerKey: 'work.abusimbel.kicker', image: '/images/abu-simbel.jpeg', textKey: 'work.abusimbel.text' },
  { titleKey: 'work.silence.title', kickerKey: 'work.silence.kicker', image: '/images/white-desert-new.jpeg', textKey: 'work.silence.text' },
  { titleKey: 'work.pyramids.title', kickerKey: 'work.pyramids.kicker', image: '/images/the-pyramids.jpeg', textKey: 'work.pyramids.text' },
];

export default function WorkPage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="page-hero work-hero"><div className="orb" /><div className="shell page-hero-inner"><p className="eyebrow light">{t('work.hero.eyebrow')}</p><h1>{t('work.hero.h1a')}<br /><span>{t('work.hero.h1b')}</span></h1><p>{t('work.hero.copy')}</p></div></section>
      <section className="work-list shell">
        {workKeys.map((item, index) => <article className="work-item" key={item.titleKey}><div className="work-image"><Image src={item.image} alt={t(item.titleKey)} fill sizes="(max-width: 800px) 100vw, 60vw" quality={100} unoptimized /></div><div className="work-copy"><span className="work-no">0{index + 1}</span><p className="eyebrow">{t(item.kickerKey)}</p><h2>{t(item.titleKey)}</h2><p>{t(item.textKey)}</p><Link href="/contact" className="text-link">{t('work.shapeLink')} <span>→</span></Link></div></article>)}
      </section>
      <section className="bespoke-banner"><div className="shell"><p className="eyebrow light">{t('work.bespoke.eyebrow')}</p><h2>{t('work.bespoke.h2a')}<br />{t('work.bespoke.h2b')}</h2><p>{t('work.bespoke.copy')}</p><Link href="/contact" className="button gold">{t('work.bespoke.cta')} <span>↗</span></Link></div></section>
    </main>
  );
}
