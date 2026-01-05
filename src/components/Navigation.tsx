import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLocale = () => {
    const newLocale = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLocale);
    localStorage.setItem('language', newLocale);
  };

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'web', href: '/web' },
    { key: 'parkour', href: '/parkour' },
    { key: 'video', href: '/video' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
            Bryan Neculfilo
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="px-3 py-1 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors font-medium"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
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
          <div className="md:hidden py-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <button
              onClick={toggleLocale}
              className="block w-full text-left px-3 py-2 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-medium"
            >
              {i18n.language === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
