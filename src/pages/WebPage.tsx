import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function WebPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/contact');
  };

  const services = [
    {
      key: 'landing',
      icon: '🎯',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'websites',
      icon: '🌐',
      color: 'from-green-500 to-green-600',
    },
    {
      key: 'apps',
      icon: '⚙️',
      color: 'from-purple-500 to-purple-600',
    },
    {
      key: 'maintenance',
      icon: '🔧',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const approach = [
    {
      key: 'simple',
      icon: '✨',
      gradient: 'from-blue-600 to-cyan-600',
    },
    {
      key: 'performance',
      icon: '⚡',
      gradient: 'from-green-600 to-emerald-600',
    },
    {
      key: 'results',
      icon: '📈',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('web.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-400 mb-6">
            {t('web.hero.subtitle')}
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('web.hero.description')}
          </p>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('contact.whatsappButton')}
          </button>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t('web.services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.key}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
                  {t(`web.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t(`web.services.${service.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t('web.approach.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {approach.map((item) => (
              <div
                key={item.key}
                className={`bg-gradient-to-br ${item.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
              >
                <div className="text-5xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t(`web.approach.${item.key}.title`)}
                </h3>
                <p className="text-lg text-center opacity-90 leading-relaxed">
                  {t(`web.approach.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

