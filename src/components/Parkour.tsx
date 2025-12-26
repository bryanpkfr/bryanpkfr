import { useTranslation } from 'react-i18next';

export default function Parkour() {
  const { t } = useTranslation();

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
    <section id="parkour" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('parkour.title')}
          </h2>
          <p className="text-xl text-primary-600 dark:text-primary-400 mb-6">
            {t('parkour.subtitle')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t('parkour.description')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('parkour.coach')}
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {t('parkour.achievements.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.key}
                className={`bg-gradient-to-br ${achievement.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
              >
                <div className="text-5xl mb-4 text-center">{achievement.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-center">
                  {t(`parkour.achievements.${achievement.key}.title`)}
                </h4>
                <p className="text-lg text-center opacity-90">
                  {t(`parkour.achievements.${achievement.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

