import { useTranslation } from 'react-i18next';

export default function WhyWorkWithMe() {
  const { t } = useTranslation();

  const reasons = [
    {
      key: 'mindset',
      icon: '🏃',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      key: 'simple',
      icon: '🎯',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      key: 'results',
      icon: '📈',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section id="why" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
          {t('home.why.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.key}
              className={`bg-gradient-to-br ${reason.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
            >
              <div className="text-5xl mb-6 text-center">{reason.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center">
                {t(`home.why.${reason.key}.title`)}
              </h3>
              <p className="text-lg text-center opacity-90 leading-relaxed">
                {t(`home.why.${reason.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
