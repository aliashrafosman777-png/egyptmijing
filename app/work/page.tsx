import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Work' };

const work = [
  { title: 'Siwa, Slowly', kicker: 'Oasis · Culture · Desert', image: '/images/siwa-palms.webp', text: 'Move from palm-shaded lanes and Amazigh traditions to the salt lakes and towering dunes of the Great Sand Sea.' },
  { title: 'Sculpted by Silence', kicker: 'White Desert · Camp · Stars', image: '/images/white-desert.webp', text: 'Cross the chalk wilderness between Bahariya and Farafra, ending each day beneath an immense desert sky.' },
  { title: 'The Colour of Eternity', kicker: 'Dendera · Qena · Nile Valley', image: '/images/dendera-ceiling.webp', text: 'Trace symbols, astronomy, and sacred architecture inside one of Egypt’s most vividly preserved temple interiors.' },
];

export default function WorkPage() {
  return (
    <main>
      <section className="page-hero work-hero"><div className="orb" /><div className="shell page-hero-inner"><p className="eyebrow light">Selected journeys</p><h1>Routes drawn<br /><span>by curiosity.</span></h1><p>Three starting points. Every final journey is shaped around the traveller.</p></div></section>
      <section className="work-list shell">
        {work.map((item, index) => <article className="work-item" key={item.title}><div className="work-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 52vw" /></div><div className="work-copy"><span className="work-no">0{index + 1}</span><p className="eyebrow">{item.kicker}</p><h2>{item.title}</h2><p>{item.text}</p><Link href="/contact" className="text-link">Shape this journey <span>→</span></Link></div></article>)}
      </section>
      <section className="bespoke-banner"><div className="shell"><p className="eyebrow light">Bespoke by nature</p><h2>No fixed path.<br />No borrowed itinerary.</h2><p>Begin with a place, a fascination, or simply a feeling. We shape the route from there.</p><Link href="/contact" className="button gold">Tell us what moves you <span>↗</span></Link></div></section>
    </main>
  );
}
