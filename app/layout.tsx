'use client';

import { Cinzel, Montserrat } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { SiteFooter } from '@/components/site-footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { LanguageProvider } from '@/lib/language-context';
import './globals.css';

const display = Cinzel({ variable: '--font-display', subsets: ['latin'] });
const body = Montserrat({ variable: '--font-body', subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>Egypt Hidden Wonders</title>
        <meta name="description" content="Private cultural journeys into Egypt's lesser-known landscapes, heritage, and living traditions." />
      </head>
      <body className={`${display.variable} ${body.variable}`}>
        <LanguageProvider>
          <Navigation />
          {children}
          <SiteFooter />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
