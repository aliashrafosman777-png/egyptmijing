'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { SiteFooter } from '@/components/site-footer';
import { WhatsAppButton } from '@/components/whatsapp-button';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return <>{children}</>;
  return <><Navigation />{children}<SiteFooter /><WhatsAppButton /></>;
}
