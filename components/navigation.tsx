'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { locale, toggle, t } = useLanguage();

  const leftLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/work', label: t('nav.work') },
    { href: '/itinerary', label: t('nav.itinerary') },
  ];

  const rightLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [pathname]);

  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header className={`site-nav-shell${isScrolled ? ' is-scrolled' : ''}`}>
        <nav className="site-nav" aria-label="Primary navigation">
          <div className="nav-group nav-group-left">
            {leftLinks.map((item) => (
              <a key={item.href} href={item.href} className={active(item.href) ? 'is-active' : ''} aria-current={active(item.href) ? 'page' : undefined}>
                {item.label}
              </a>
            ))}
          </div>

          <a href="/" className="nav-logo" aria-label="Egypt Hidden Wonders home">
            <Image src="/brand/egypt-hidden-wonders-emblem.png" alt="Egypt Hidden Wonders" width={1000} height={1010} priority />
          </a>

          <div className="nav-group nav-group-right">
            <a href="/about" className={active('/about') ? 'is-active' : ''} aria-current={active('/about') ? 'page' : undefined}>{t('nav.about')}</a>

            <button
              type="button"
              className="lang-toggle"
              onClick={toggle}
              aria-label={`Switch language to ${locale === 'en' ? 'Chinese Traditional' : 'English'}`}
            >
              <span className={locale === 'en' ? 'is-active' : ''}>EN</span>
              <span className="lang-divider" aria-hidden="true" />
              <span className={locale === 'zh-TW' ? 'is-active' : ''}>繁</span>
            </button>

            <a href="/contact" className={`nav-contact${active('/contact') ? ' is-active' : ''}`} aria-current={active('/contact') ? 'page' : undefined}>{t('nav.contact')}</a>
          </div>

          <button className={`nav-toggle${isOpen ? ' is-open' : ''}`} type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen((value) => !value)}>
            <span /><span /><span />
          </button>
        </nav>
      </header>

      <div id="mobile-navigation" className={`mobile-navigation${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {allLinks.map((item, index) => (
            <a key={item.href} href={item.href} className={active(item.href) ? 'is-active' : ''} style={{ '--menu-index': index } as CSSProperties}>
              <span>0{index + 1}</span>{item.label}
            </a>
          ))}
        </nav>
        <button type="button" className="lang-toggle lang-toggle-mobile" onClick={toggle} aria-label={`Switch language to ${locale === 'en' ? 'Chinese Traditional' : 'English'}`}>
          <span className={locale === 'en' ? 'is-active' : ''}>EN</span>
          <span className="lang-divider" aria-hidden="true" />
          <span className={locale === 'zh-TW' ? 'is-active' : ''}>繁</span>
        </button>
        <p>{t('nav.mobileTagline')}</p>
      </div>
    </>
  );
}
