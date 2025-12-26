import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function VideoPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToContact = () => {
    navigate('/contact');
  };

  const services = [
    {
      key: 'social',
      icon: '📱',
      color: 'from-pink-500 to-rose-500',
    },
    {
      key: 'promotional',
      icon: '🎬',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'athletic',
      icon: '🏃',
      color: 'from-green-500 to-emerald-500',
    },
    {
      key: 'corporate',
      icon: '💼',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const style = [
    {
      key: 'dynamic',
      icon: '⚡',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      key: 'clean',
      icon: '✨',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'purpose',
      icon: '🎯',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('video.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-400 mb-6">
            {t('video.hero.subtitle')}
          </p>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('video.hero.description')}
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
            {t('video.services.title')}
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
                  {t(`video.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t(`video.services.${service.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t('video.style.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {style.map((item) => (
              <div
                key={item.key}
                className={`bg-gradient-to-br ${item.gradient} p-8 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all`}
              >
                <div className="text-5xl mb-6 text-center">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  {t(`video.style.${item.key}.title`)}
                </h3>
                <p className="text-lg text-center opacity-90 leading-relaxed">
                  {t(`video.style.${item.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

