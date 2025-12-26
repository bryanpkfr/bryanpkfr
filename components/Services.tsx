'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = [
    {
      key: 'web',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'parkour',
      icon: '🏃',
      color: 'from-green-500 to-emerald-500',
    },
    {
      key: 'video',
      icon: '🎬',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.key}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 dark:border-gray-600"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t(`${service.key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('contact')}
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {locale === 'es' ? 'Contáctame' : 'Contact Me'}
          </button>
        </div>
      </div>
    </section>
  );
}

