'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="page-hero about-hero">
        <div className="about-orb-field" aria-hidden="true">
          <span className="about-orb about-orb-one" />
          <span className="about-orb about-orb-two" />
          <span className="about-orb about-orb-three" />
        </div>
        <div className="shell page-hero-inner"><p className="eyebrow light">{t('about.hero.eyebrow')}</p><h1>{t('about.hero.h1a')}<br /><span>{t('about.hero.h1b')}</span></h1><p>{t('about.hero.copy')}</p></div>
      </section>
      <section className="story-section"><div className="shell story-grid"><div><p className="eyebrow">{t('about.story.eyebrow')}</p><h2>{t('about.story.h2')}</h2></div><div className="story-video-placeholder" role="img" aria-label="Video placeholder"><span className="story-video-play"><Play size={28} fill="currentColor" aria-hidden="true" /></span><p>{t('about.story.videoLabel')}</p><small>{t('about.story.videoRatio')}</small></div></div></section>
      <section className="vision-block"><div className="vision-image"><Image src="/images/dendera-ceiling.webp" alt="Painted ceiling within the Temple of Hathor at Dendera" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="vision-copy"><p className="eyebrow light">{t('about.vision.eyebrow')}</p><h2>{t('about.vision.h2a')}<br />{t('about.vision.h2b')}</h2><p>{t('about.vision.copy')}</p><blockquote>{t('about.vision.quote')}</blockquote></div></section>
      <section className="team-section" id="team">
        <div className="shell">
          <div className="team-heading">
            <p className="eyebrow">{t('about.team.eyebrow')}</p>
            <span>01 / 03</span>
          </div>
          <div className="team-grid">
            <article className="team-profile">
              <div className="team-portrait">
                <Image
                  src="/images/emad-monochrome.png"
                  alt={t('about.team.imageAlt')}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
                <span className="team-number">01</span>
              </div>
              <div className="team-profile-copy">
                <p className="team-role">{t('about.team.role')}</p>
                <h2>{t('about.team.name')}</h2>
                <dl className="team-biography">
                  <div><dt>{t('about.team.egyptianNameLabel')}</dt><dd>{t('about.team.egyptianName')}</dd></div>
                  <div><dt>{t('about.team.chineseNameLabel')}</dt><dd>{t('about.team.chineseName')}</dd></div>
                  <div><dt>2005</dt><dd>{t('about.team.2005')}</dd></div>
                  <div><dt>2007</dt><dd>{t('about.team.2007')}</dd></div>
                  <div><dt>2007—</dt><dd>{t('about.team.guide')}</dd></div>
                  <div><dt>2016</dt><dd>{t('about.team.2016')}</dd></div>
                </dl>
              </div>
            </article>
            <article className="team-profile">
              <div className="team-portrait">
                <Image
                  src="/images/hashim-monochrome.png"
                  alt={t('about.team.hashim.imageAlt')}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
                <span className="team-number">02</span>
              </div>
              <div className="team-profile-copy">
                <p className="team-role">{t('about.team.hashim.role')}</p>
                <h2>{t('about.team.hashim.name')}</h2>
                <dl className="team-biography">
                  <div><dt>{t('about.team.egyptianNameLabel')}</dt><dd>{t('about.team.hashim.egyptianName')}</dd></div>
                  <div><dt>{t('about.team.chineseNameLabel')}</dt><dd>{t('about.team.hashim.chineseName')}</dd></div>
                  <div><dt>2010</dt><dd>{t('about.team.hashim.education')}</dd></div>
                  <div><dt>2010—</dt><dd>{t('about.team.hashim.experience')}</dd></div>
                </dl>
              </div>
            </article>
            <article className="team-profile team-profile-narrative" id="li-jian">
              <div className="team-portrait">
                <Image
                  src="/images/li-jian-profile.jpeg"
                  alt={t('about.team.lijian.imageAlt')}
                  fill
                  sizes="(max-width: 720px) 100vw, 33vw"
                />
                <span className="team-number">03</span>
              </div>
              <div className="team-profile-copy">
                <p className="team-role">{t('about.team.lijian.role')}</p>
                <h2>{t('about.team.lijian.name')}</h2>
                <div className="team-profile-summary">
                  <h3>{t('about.team.lijian.profileLabel')}</h3>
                  <p>{t('about.team.lijian.intro')}</p>
                  <p>{t('about.team.lijian.education')}</p>
                  <p>{t('about.team.lijian.lecturer')}</p>
                  <p>{t('about.team.lijian.taiwan')}</p>
                  <p>{t('about.team.lijian.reputation')}</p>
                  <p>{t('about.team.lijian.promise')}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
