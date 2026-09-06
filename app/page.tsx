import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const journeys = [
  { place: 'Siwa Oasis', label: 'Desert sanctuary', image: '/images/siwa-palms.webp', note: 'Palm groves, salt lakes, old Shali, and the immense quiet of the Great Sand Sea.' },
  { place: 'The White Desert', label: 'Elemental landscape', image: '/images/white-desert.webp', note: 'A private passage through wind-carved chalk, starlit camps, and Western Desert silence.' },
  { place: 'Dendera', label: 'Sacred architecture', image: '/images/dendera-ceiling.webp', note: 'Colour, cosmology, and living memory beneath the monumental ceiling of Hathor.' },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <Image src="/images/siwa-palms.webp" alt="Siwa Oasis at sunset, with palm groves below the desert plateau" fill priority className="hero-image" sizes="100vw" />
        <div className="hero-shade" /><div className="hero-grain" />
        <div className="hero-content shell">
          <p className="eyebrow light">Private cultural journeys · Egypt</p>
          <h1>Beyond the known.<span>Into the extraordinary.</span></h1>
          <p className="hero-copy">Thoughtful journeys into the landscapes, stories, and living traditions that most visitors never reach.</p>
          <div className="hero-actions">
            <Link href="/work" className="button gold">Explore our journeys <ArrowUpRight size={17} aria-hidden="true" /></Link>
            <Link href="/about" className="text-link light-link">Our approach <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <a className="scroll-cue" href="#discovery" aria-label="Scroll to discover">Discover <ArrowDown size={15} aria-hidden="true" /></a>
        <div className="hero-index" aria-hidden="true">01 / 03</div>
      </section>

      <section className="intro-section" id="discovery">
        <div className="shell intro-grid">
          <div><p className="eyebrow">The Egypt between the lines</p><h2>Not a checklist.<br />A way of seeing.</h2></div>
          <div className="intro-copy"><p>We reveal Egypt through intimate encounters and unhurried exploration: desert paths, sacred chambers, family tables, and stories carried forward by the people who call these places home.</p><Link href="/about" className="text-link">Discover our story <span>→</span></Link></div>
        </div>
      </section>

      <section className="journeys-section">
        <div className="shell section-heading">
          <div><p className="eyebrow light">Three ways into wonder</p><h2>Begin somewhere unexpected.</h2></div>
          <p>Each journey is shaped around place, pace, and the kind of memory that cannot be scheduled.</p>
        </div>
        <div className="journey-list">
          {journeys.map((journey, index) => (
            <article className="journey-card" key={journey.place}>
              <Image src={journey.image} alt={journey.place} fill sizes="(max-width: 760px) 100vw, 34vw" />
              <div className="journey-overlay" />
              <span className="journey-number">0{index + 1}</span>
              <div className="journey-copy"><p>{journey.label}</p><h3>{journey.place}</h3><span>{journey.note}</span></div>
            </article>
          ))}
        </div>
        <div className="center-link"><Link href="/work" className="button outline-light">View all journeys <span>→</span></Link></div>
      </section>

      <section className="principles-section">
        <div className="shell principles-grid">
          <div><p className="eyebrow">Our compass</p><h2>Travel with reverence.</h2></div>
          <div className="principles-list">
            <div><span>01</span><h3>Authentic access</h3><p>Encounters rooted in place, guided by people with genuine knowledge and connection.</p></div>
            <div><span>02</span><h3>Considered pace</h3><p>Fewer stops, deeper attention, and enough space for the unexpected to become the story.</p></div>
            <div><span>03</span><h3>Living heritage</h3><p>Respect for the landscapes, communities, and traditions that make every journey possible.</p></div>
          </div>
        </div>
      </section>

      <section className="closing-cta"><div className="shell"><p className="eyebrow light">Your Egypt, revealed</p><h2>Follow the eye<br />beyond the horizon.</h2><Link href="/contact" className="button gold">Begin a conversation <ArrowUpRight size={17} /></Link></div></section>
    </main>
  );
}
