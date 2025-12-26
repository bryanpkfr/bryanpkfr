import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  const validatedLocale = locale as Locale;

  return {
    locale: validatedLocale,
    messages: (await import(`./messages/${validatedLocale}.json`)).default
  };
});

