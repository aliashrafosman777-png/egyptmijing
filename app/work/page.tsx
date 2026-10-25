'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import type { ManagedContent, WorkPlace } from '@/lib/managed-content-types';
import { defaultWorkPlaces } from '@/lib/work-defaults';

export default function WorkPage() {
  const { locale, t } = useLanguage();
  const [places, setPlaces] = useState<WorkPlace[]>(defaultWorkPlaces);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() as Promise<ManagedContent> : null)
      .then((content) => { if (content?.work) setPlaces(content.work); })
      .catch(() => undefined);
  }, []);

  const language = locale === 'zh-TW' ? 'zhTW' : 'en';
  const publishedPlaces = places.filter((place) => place.isPublished !== false);

  return (
    <main>
      <section className="page-hero work-hero"><div className="orb" /><div className="shell page-hero-inner"><p className="eyebrow light">{t('work.hero.eyebrow')}</p><h1>{t('work.hero.h1a')}<br /><span>{t('work.hero.h1b')}</span></h1><p>{t('work.hero.copy')}</p></div></section>
      <section className="work-list shell">
        {publishedPlaces.map((item, index) => <article className="work-item" key={item.id}><div className="work-image"><Image src={item.image} alt={item.imageAlt[language]} fill sizes="(max-width: 800px) 100vw, 60vw" quality={100} unoptimized /></div><div className="work-copy"><span className="work-no">{String(index + 1).padStart(2, '0')}</span><p className="eyebrow">{item.kicker[language]}</p><h2>{item.title[language]}</h2><p>{item.description[language]}</p><a href="/contact" className="text-link">{t('work.shapeLink')} <span>→</span></a></div></article>)}
      </section>
      <section className="bespoke-banner"><div className="shell"><p className="eyebrow light">{t('work.bespoke.eyebrow')}</p><h2>{t('work.bespoke.h2a')}<br />{t('work.bespoke.h2b')}</h2><p>{t('work.bespoke.copy')}</p><a href="/contact" className="button gold">{t('work.bespoke.cta')} <span>↗</span></a></div></section>
    </main>
  );
}
