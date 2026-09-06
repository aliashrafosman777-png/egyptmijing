import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image src="/brand/egypt-hidden-wonders-logo.png" alt="Egypt Hidden Wonders" width={280} height={255} />
          <p>Authenticity · Discovery · Tradition</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/">Home</Link><Link href="/about">About</Link><Link href="/work">Work</Link><Link href="/contact">Contact</Link>
        </div>
        <div>
          <p className="footer-label">Begin</p>
          <p className="footer-note">Your journey begins with a conversation.</p>
          <Link href="/contact" className="text-link footer-link">Plan a journey <span>→</span></Link>
        </div>
      </div>
      <div className="shell footer-base">
        <span>© 2026 Egypt Hidden Wonders</span>
        <span className="photo-credit">Photography: <a href="https://commons.wikimedia.org/wiki/File:SIWA_PALMS.jpg">Hesham Farouk Ragab</a> · <a href="https://commons.wikimedia.org/wiki/File:White_Desert,_Egypt.jpg">Vyacheslav Argenberg</a></span>
      </div>
    </footer>
  );
}
