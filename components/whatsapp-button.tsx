'use client';

import { useLanguage } from '@/lib/language-context';

const WHATSAPP_NUMBER = '201142500877';

export function WhatsAppButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('whatsapp.message'))}`;

  return (
    <a
      className="whatsapp-button"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('whatsapp.label')}: +20 114 250 0877`}
    >
      <span className="whatsapp-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="presentation">
          <path className="whatsapp-bubble" d="M16 3.5C9.1 3.5 3.5 8.8 3.5 15.4c0 2.6.9 5 2.4 7L4.2 28l5.9-1.5c1.8.7 3.8 1.1 5.9 1.1 6.9 0 12.5-5.3 12.5-11.9S22.9 3.5 16 3.5Z" />
          <path className="whatsapp-phone" d="M10.3 9.5c.4-.9 1.3-1 2-.3l1.4 2.1c.4.6.3 1.4-.2 1.9l-1 1c1 2.2 2.6 3.7 4.8 4.8l1-1c.5-.5 1.3-.6 1.9-.2l2.1 1.4c.7.5.6 1.6-.3 2l-1.5.6c-1.3.5-2.8.5-4.1-.2a15 15 0 0 1-7.2-7.2c-.7-1.3-.7-2.8-.2-4.1l.6-1.5Z" />
        </svg>
      </span>
    </a>
  );
}
