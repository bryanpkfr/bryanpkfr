import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      key: 'onePage',
      icon: '📄',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'mobile',
      icon: '📱',
      color: 'from-green-500 to-green-600',
    },
    {
      key: 'whatsapp',
      icon: '💬',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      key: 'fast',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      key: 'convert',
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
    },
    {
      key: 'simple',
      icon: '✨',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  const scrollToContact = () => {
    navigate('/contact');
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-700"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
                {t(`home.services.features.${feature.key}.title`)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {t(`home.services.features.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToContact}
            className="px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('home.services.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}
