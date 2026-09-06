import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero"><div className="orb" /><div className="shell page-hero-inner"><p className="eyebrow light">About us</p><h1>Egypt deserves<br /><span>more than a glance.</span></h1><p>We connect the curious with the Egypt that lives beyond the postcard.</p></div></section>
      <section className="story-section"><div className="shell story-grid"><div><p className="eyebrow">Our purpose</p><h2>To reveal without reducing.</h2></div><div className="prose"><p className="lead">Egypt Hidden Wonders was imagined for travellers who want context, connection, and a sense of discovery that goes deeper than arrival.</p><p>Our role is to curate access with care: pairing remarkable landscapes and heritage with local knowledge, thoughtful pacing, and respect for the people who carry these stories forward.</p><p>We believe the most powerful journeys do not make a place perform. They create room to listen, notice, and understand.</p></div></div></section>
      <section className="vision-block"><div className="vision-image"><Image src="/images/dendera-ceiling.webp" alt="Painted ceiling within the Temple of Hathor at Dendera" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="vision-copy"><p className="eyebrow light">Vision</p><h2>Preserve wonder.<br />Deepen connection.</h2><p>We envision travel that protects what makes a place singular while creating meaningful exchange between visitors and hosts.</p><blockquote>“The rarest luxury is not access alone. It is understanding.”</blockquote></div></section>
      <section className="values-section"><div className="shell"><p className="eyebrow">What guides us</p><div className="values-grid"><div><span>Preservation</span><p>Care for heritage, landscape, and local rhythm.</p></div><div><span>Discovery</span><p>Curiosity over convention; depth over spectacle.</p></div><div><span>Authenticity</span><p>Human stories told with clarity and respect.</p></div><div><span>Excellence</span><p>Thoughtful detail, from first idea to final return.</p></div></div><Link href="/contact" className="text-link">Start your story <span>→</span></Link></div></section>
    </main>
  );
}
