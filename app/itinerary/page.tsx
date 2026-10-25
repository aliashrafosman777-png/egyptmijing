'use client';

/* oxlint-disable next/no-html-link-for-pages -- Vinext's production router currently requires plain anchors for internal navigation. */

import Image from 'next/image';
import { BedDouble, Check, Clock3, MapPin, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/lib/language-context';
import type { ManagedContent } from '@/lib/managed-content-types';
import type { ManagedItineraries } from '@/lib/itinerary-types';
import { english, traditionalChinese } from '@/lib/itinerary-defaults';

export default function ItineraryPage() {
  const { locale } = useLanguage();
  const [managed, setManaged] = useState<ManagedItineraries | null>(null);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() as Promise<ManagedContent> : null)
      .then((content) => { if (content?.itineraries) setManaged(content.itineraries); })
      .catch(() => undefined);
  }, []);

  const source = locale === 'zh-TW' ? managed?.zhTW ?? traditionalChinese : managed?.en ?? english;
  const content = { ...source, journeys: source.journeys.filter((journey) => journey.isPublished !== false) };

  return (
    <main className="itinerary-page">
      <section className="itinerary-hero">
        <Image src="/images/the-pyramids.jpeg" alt="The Giza pyramids rising above the desert" fill priority sizes="100vw" className="itinerary-hero-image" />
        <div className="itinerary-hero-shade" />
        <div className="shell itinerary-hero-content">
          <p className="eyebrow light">{content.eyebrow}</p>
          <h1>{content.title}<span>{content.titleAccent}</span></h1>
          <p>{content.intro}</p>
        </div>
        <div className="itinerary-hero-index" aria-hidden="true">01 — 03</div>
      </section>

      <section className="itinerary-explorer">
        <Tabs defaultValue="classic" className="shell itinerary-tabs">
          <div className="itinerary-tabs-heading">
            <p className="eyebrow">{content.choose}</p>
            <span>01 — 03</span>
          </div>
          <TabsList className="itinerary-tab-list" aria-label={content.choose}>
            {content.journeys.map((journey) => (
              <TabsTrigger key={journey.id} value={journey.id} className="itinerary-tab-trigger">
                <span className="itinerary-tab-number">{journey.number}</span>
                <span><strong>{journey.title}</strong><small>{journey.daysLabel} · {journey.route}</small></span>
              </TabsTrigger>
            ))}
          </TabsList>

          {content.journeys.map((journey) => (
            <TabsContent key={journey.id} value={journey.id} className="itinerary-tab-content">
              <article>
                <header className="itinerary-overview">
                  <div className="itinerary-overview-image">
                    <Image src={journey.image} alt={journey.imageAlt} fill sizes="(max-width: 850px) 100vw, 46vw" />
                    <span>{journey.number}</span>
                  </div>
                  <div className="itinerary-overview-copy">
                    <p className="eyebrow">{journey.daysLabel}</p>
                    <h2>{journey.title}</h2>
                    <p className="itinerary-introduction">{journey.introduction}</p>
                    <dl className="itinerary-facts">
                      <div><dt><MapPin size={16} />{content.routeLabel}</dt><dd>{journey.route}</dd></div>
                      <div><dt><Users size={16} />{content.guestsLabel}</dt><dd>{journey.group}</dd></div>
                      <div><dt><Clock3 size={16} />{content.investmentLabel}</dt><dd>{journey.price}<small>{journey.priceNote}</small></dd></div>
                    </dl>
                  </div>
                </header>

                <div className="itinerary-detail-grid">
                  <div className="itinerary-timeline">
                    {journey.days.map((day, index) => (
                      <section className="itinerary-day" key={`${journey.id}-${index}`}>
                        <div className="itinerary-day-number"><span>{content.dayLabel}</span>{String(index + 1).padStart(2, '0')}</div>
                        <div className="itinerary-day-copy">
                          <p className="itinerary-place"><MapPin size={14} />{day.place}</p>
                          <h3>{day.title}</h3>
                          <ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                        </div>
                        <p className="itinerary-stay"><BedDouble size={15} /><span>{content.stayLabel}</span><strong>{day.stay}</strong></p>
                      </section>
                    ))}
                  </div>

                  <aside className="itinerary-terms">
                    <div>
                      <p className="itinerary-terms-title">{content.includedLabel}</p>
                      <ul>{journey.included.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
                    </div>
                    <div>
                      <p className="itinerary-terms-title">{content.excludedLabel}</p>
                      <ul>{journey.excluded.map((item) => <li key={item}><X size={15} />{item}</li>)}</ul>
                    </div>
                    {journey.payment && <div className="itinerary-payment"><p>{content.paymentLabel}</p><span>{journey.payment}</span></div>}
                  </aside>
                </div>
              </article>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="itinerary-cta">
        <div className="shell">
          <p className="eyebrow light">{content.ctaEyebrow}</p>
          <h2>{content.ctaTitle}</h2>
          <p>{content.ctaCopy}</p>
          <a href="/contact" className="button gold">{content.ctaButton}</a>
        </div>
      </section>
    </main>
  );
}
