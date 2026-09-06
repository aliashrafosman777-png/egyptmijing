import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <main>
      <section className="contact-hero"><div className="contact-symbol" aria-hidden="true">𓂀</div><div className="shell contact-grid"><div><p className="eyebrow light">Begin a conversation</p><h1>Where is Egypt<br /><span>calling you?</span></h1></div><div className="contact-intro"><p>Tell us what you are curious about, how you like to travel, and the pace that feels right. The first conversation is simply a chance to listen.</p><a href="mailto:hello@egypthiddenwonders.com" className="button gold">Write to us <ArrowUpRight size={17} /></a></div></div></section>
      <section className="contact-details"><div className="shell"><div className="contact-rule"><span>01</span><div><h2>Bring an idea</h2><p>A place, a date, a private milestone, or a question you cannot stop thinking about.</p></div></div><div className="contact-rule"><span>02</span><div><h2>We listen</h2><p>We learn what matters to you before suggesting a route or rhythm.</p></div></div><div className="contact-rule"><span>03</span><div><h2>We shape the journey</h2><p>Details arrive only after the purpose of the journey is clear.</p></div></div><div className="contact-note"><p>Prefer to explore first?</p><Link href="/work" className="text-link">View selected journeys <span>→</span></Link></div></div></section>
    </main>
  );
}
