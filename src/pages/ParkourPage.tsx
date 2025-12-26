import { useTranslation } from 'react-i18next';

export default function ParkourPage() {
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

  const philosophy = [
    {
      key: 'discipline',
      icon: '💪',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      key: 'progression',
      icon: '📈',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      key: 'efficiency',
      icon: '⚡',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('parkour.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('parkour.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
            {t('parkour.about.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {t('parkour.about.description')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('parkour.about.coach')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t('parkour.achievements.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.key}
                className={`bg-gradient-to-br ${achievement.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
              >
                <div className="text-5xl mb-4 text-center">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {t(`parkour.achievements.${achievement.key}.title`)}
                </h3>
                <p className="text-lg text-center opacity-90">
                  {t(`parkour.achievements.${achievement.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t('parkour.philosophy.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophy.map((item) => (
              <div
                key={item.key}
                className={`bg-gradient-to-br ${item.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
              >
                <div className="text-5xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t(`parkour.philosophy.${item.key}.title`)}
                </h3>
                <p className="text-lg text-center opacity-90 leading-relaxed">
                  {t(`parkour.philosophy.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

