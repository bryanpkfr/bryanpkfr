'use client';

import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  const skills = [
    { key: 'athlete', icon: '🏃' },
    { key: 'developer', icon: '💻' },
    { key: 'instructor', icon: '👨‍🏫' },
    { key: 'editor', icon: '🎬' },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center leading-relaxed">
            {t('description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.key}
                className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-4xl mb-4 text-center">{skill.icon}</div>
                <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
                  {t(skill.key)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

