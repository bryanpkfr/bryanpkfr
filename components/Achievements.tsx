'use client';

import { useTranslations } from 'next-intl';

export default function Achievements() {
  const t = useTranslations('achievements');

  const achievements = [
    {
      key: 'leyendas',
      icon: '🏆',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      key: 'lagos',
      icon: '🥇',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      key: 'imperial',
      icon: '🥉',
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.key}
              className={`bg-gradient-to-br ${achievement.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
            >
              <div className="text-5xl mb-4 text-center">{achievement.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                {t(`${achievement.key}.title`)}
              </h3>
              <p className="text-lg text-center opacity-90">
                {t(`${achievement.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

