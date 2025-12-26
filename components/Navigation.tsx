'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    window.location.href = `/${newLocale}`;
  };

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}#about` },
    { key: 'achievements', href: `/${locale}#achievements` },
    { key: 'services', href: `/${locale}#services` },
    { key: 'contact', href: `/${locale}#contact` },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-primary-600">
            Bryan Neculfilo
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="px-3 py-1 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
            >
              {locale === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="block w-full text-left px-3 py-2 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
            >
              {locale === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

