import type { Metadata } from 'next';
import { Cinzel, Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const display = Cinzel({ variable: '--font-display', subsets: ['latin'] });
const body = Montserrat({ variable: '--font-body', subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Egypt Hidden Wonders', template: '%s · Egypt Hidden Wonders' },
  description: 'Private cultural journeys into Egypt’s lesser-known landscapes, heritage, and living traditions.',
};

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Egypt Hidden Wonders home">
            <Image src="/brand/egypt-hidden-wonders-mark.png" alt="" width={72} height={48} priority />
            <span>Egypt Hidden Wonders</span>
          </Link>
          <nav aria-label="Primary navigation">{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
          <Link href="/contact" className="header-cta">Plan a journey <span>↗</span></Link>
          <details className="mobile-menu">
            <summary aria-label="Open menu"><span /><span /></summary>
            <div>{nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
          </details>
        </header>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
