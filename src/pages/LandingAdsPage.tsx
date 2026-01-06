import { useEffect, useRef, useState } from 'react';
import ContactForm from '../components/ContactForm';
import LandingNavbar from '../components/LandingNavbar';

// Hook personalizado para Scroll Reveal
function useScrollReveal(threshold = 0.1, delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);

  return { ref, isVisible };
}

export default function LandingAdsPage() {
  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Hooks para diferentes secciones
  const metodoTitleRef = useScrollReveal(0.2, 0);
  const metodoStep1Ref = useScrollReveal(0.2, 0);
  const metodoStep2Ref = useScrollReveal(0.2, 200);
  const metodoStep3Ref = useScrollReveal(0.2, 400);
  const metodoBoxRef = useScrollReveal(0.2, 600);
  const problemaRef = useScrollReveal(0.2, 0);
  const codigoVsRef = useScrollReveal(0.2, 0);
  const resultadosRef = useScrollReveal(0.2, 0);
  const porQueYoRef = useScrollReveal(0.2, 0);
  const queIncluyeRef = useScrollReveal(0.2, 0);
  const faqRef = useScrollReveal(0.2, 0);
  const ctaFinalRef = useScrollReveal(0.2, 0);

  const bannerItems = [
    { main: 'Rápido', sub: '5-7 días' },
    { main: 'Accesible', sub: 'Desde $300' },
    { main: 'Garantía', sub: '30 días' },
    { main: 'Personalizado', sub: '100% único' },
    { main: 'Resultados', sub: 'Medibles' },
    { main: 'Sin compromiso', sub: 'Consulta gratis' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar Sticky */}
      <LandingNavbar />

      {/* Hero Section con Video de Fondo */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={`${import.meta.env.BASE_URL}videos/gota-agua.mp4`} type="video/mp4" />
            <source src={`${import.meta.env.BASE_URL}videos/gota-agua.webm`} type="video/webm" />
            {/* Fallback si el video no carga */}
          </video>
          {/* Overlay con degradado para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
        </div>

        {/* Contenido del Hero */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Si pagas anuncios y no conviertes,
            <span className="block bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mt-2">el problema no es el tráfico.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Convierto tus anuncios en clientes reales mediante landing pages claras, estratégicas y orientadas a resultados.
          </p>
          <button
            onClick={scrollToForm}
            className="px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary-500/50"
          >
            Agenda una videollamada
          </button>
        </div>
      </section>

      {/* Banner Carrusel Minimalista */}
      <section className="relative z-10 bg-black border-y border-gray-800 overflow-hidden">
        <div className="flex animate-scroll hover:pause-animation">
          {/* Primera copia */}
          {bannerItems.map((item, index) => (
            <div key={`first-${index}`} className="flex items-center gap-12 px-12 md:px-20 py-8 md:py-10 flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-black text-gray-400 tracking-wider uppercase">{item.main}</span>
                <span className="text-xs md:text-sm text-gray-500/70 mt-1">{item.sub}</span>
              </div>
            </div>
          ))}
          {/* Segunda copia (para efecto infinito) */}
          {bannerItems.map((item, index) => (
            <div key={`second-${index}`} className="flex items-center gap-12 px-12 md:px-20 py-8 md:py-10 flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-black text-gray-400 tracking-wider uppercase">{item.main}</span>
                <span className="text-xs md:text-sm text-gray-500/70 mt-1">{item.sub}</span>
              </div>
            </div>
          ))}
          {/* Tercera copia (para efecto infinito) */}
          {bannerItems.map((item, index) => (
            <div key={`third-${index}`} className="flex items-center gap-12 px-12 md:px-20 py-8 md:py-10 flex-shrink-0">
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-black text-gray-400 tracking-wider uppercase">{item.main}</span>
                <span className="text-xs md:text-sm text-gray-500/70 mt-1">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </section>

      {/* Método Section */}
      <section id="metodo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div
            ref={metodoTitleRef.ref}
            className={`transition-all duration-700 ${
              metodoTitleRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16">
              Un sistema simple que convierte anuncios en clientes reales
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div
              ref={metodoStep1Ref.ref}
              className={`text-center transition-all duration-700 ${
                metodoStep1Ref.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-primary-500/30">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-4">Anuncio</h3>
                <p className="text-gray-400">Tu anuncio atrae tráfico calificado</p>
              </div>
            </div>
            <div
              ref={metodoStep2Ref.ref}
              className={`text-center transition-all duration-700 ${
                metodoStep2Ref.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-primary-500/30">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-4">Landing</h3>
                <p className="text-gray-400">Una página clara que convierte visitantes</p>
              </div>
            </div>
            <div
              ref={metodoStep3Ref.ref}
              className={`text-center transition-all duration-700 ${
                metodoStep3Ref.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-primary-500/30">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-4">Cliente</h3>
                <p className="text-gray-400">Leads calificados listos para cerrar</p>
              </div>
            </div>
          </div>

          <div
            ref={metodoBoxRef.ref}
            className={`bg-gray-900 rounded-2xl p-8 md:p-12 transition-all duration-700 ${
              metodoBoxRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              No es solo diseño bonito
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Creo landing pages con <strong className="text-white">copy estratégico</strong> y <strong className="text-white">arquitectura de alto rendimiento</strong>.
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold mb-3 text-primary-400">Ingeniería asistida por IA</h4>
                <p className="text-lg text-gray-300">
                  Utilizo herramientas de vanguardia (Cursor) para escribir y auditar cada línea de código. Esto garantiza una página 100% limpia, sin errores y optimizada para convertir cada visita en una oportunidad de venta.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-3 text-primary-400">Propósito claro</h4>
                <p className="text-lg text-gray-300">
                  No relleno espacios. Cada sección está diseñada para derribar las dudas de tu cliente y llevarlo directo al botón de contacto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div
            ref={problemaRef.ref}
            className={`transition-all duration-700 ${
              problemaRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ¿Te suena familiar?
            </h2>
            <div className="space-y-8 text-lg text-gray-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">✗</div>
                <p>Inviertes en anuncios de Facebook, Google o Instagram, pero solo recibes curiosos que no se convierten en clientes.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">✗</div>
                <p>No sabes realmente cuánto te cuesta conseguir un cliente potencial porque no mides correctamente.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">✗</div>
                <p>Tienes presupuesto y estás dispuesto a invertir, pero sientes que estás desperdiciando dinero en tráfico que no se convierte.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold">✗</div>
                <p>Si tu web no convierte clicks en ventas, estás perdiendo dinero.</p>
              </div>
            </div>
            <p className="mt-12 text-xl text-center text-gray-400">
              <strong className="text-white">El problema no es tu producto ni tu precio.</strong> El problema es que no tienes una landing page diseñada para convertir visitantes en clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Código a medida vs. Constructores Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div
            ref={codigoVsRef.ref}
            className={`transition-all duration-700 ${
              codigoVsRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              ¿Por qué código y no una plantilla?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 text-center border border-gray-700/50 hover:border-primary-500/50 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Velocidad de Carga</h3>
                <p className="text-gray-300 mb-4">Código puro = carga instantánea. Otras plataformas cargan datos innecesarios.</p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-sm text-primary-400 font-semibold">
                    El 54% de los usuarios abandona una web si tarda más de 3 segundos.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 text-center border border-gray-700/50 hover:border-primary-500/50 transition-all">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Seguridad</h3>
                <p className="text-gray-300">Sin plugins de terceros que se rompen o son hackeados.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 text-center border border-gray-700/50 hover:border-primary-500/50 transition-all">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">SEO</h3>
                <p className="text-gray-300">Google ama las páginas livianas. Aparecerás más arriba que tu competencia.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 text-center border border-gray-700/50 hover:border-primary-500/50 transition-all">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Mobile-First</h3>
                <p className="text-gray-300">90% de tus clientes te busca desde celular. Optimizado para agendar rápido desde cualquier dispositivo.</p>
              </div>
            </div>
            
            {/* Bloque destacado sobre Wix y WordPress */}
            <div className="mt-12 bg-gradient-to-r from-red-900/20 via-red-800/20 to-red-900/20 border border-red-700/50 rounded-xl p-6 md:p-8">
              <p className="text-lg md:text-xl text-gray-200 text-center">
                <strong className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Wix y WordPress suelen ser pesados y difíciles de navegar en celular.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Section */}
      <section id="resultados" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div
            ref={resultadosRef.ref}
            className={`transition-all duration-700 ${
              resultadosRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Casos reales en producción
            </h2>
            <p className="text-xl text-gray-300 text-center mb-16">
              Proyectos funcionales, no mockups
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <a 
                href="https://www.opengarage.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/20 transition-all cursor-pointer group"
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">OpenGarage</h3>
                <p className="text-gray-300 mb-4">
                  Landing page optimizada para captar leads calificados en el sector automotriz.
                </p>
                <p className="text-sm text-gray-400">
                  Proyecto real, funcional y en producción.
                </p>
                <p className="text-sm text-primary-400 mt-4 font-semibold">
                  Ver sitio web →
                </p>
              </a>
              
              <a 
                href="https://www.avexmov.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 rounded-xl p-8 border border-gray-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/20 transition-all cursor-pointer group"
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors">AVEX Movement</h3>
                <p className="text-gray-300 mb-4">
                  Landing page estratégica para convertir visitantes en clientes potenciales.
                </p>
                <p className="text-sm text-gray-400">
                  Proyecto real, funcional y en producción.
                </p>
                <p className="text-sm text-primary-400 mt-4 font-semibold">
                  Ver sitio web →
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué trabajar conmigo Section */}
      <section id="por-que-yo" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div
            ref={porQueYoRef.ref}
            className={`transition-all duration-700 ${
              porQueYoRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Por qué trabajar conmigo
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 border border-gray-700/50 hover:border-primary-500/30 transition-all">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Enfoque exclusivo</h3>
                <p className="text-gray-300">Trabajo con un cliente a la vez. Tu proyecto recibe toda mi atención y criterio estratégico.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 border border-gray-700/50 hover:border-primary-500/30 transition-all">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Desarrollo de Alta Velocidad</h3>
                <p className="text-gray-300">Gracias al uso de Inteligencia Artificial en el flujo de programación, entrego en días lo que a otros les toma semanas, manteniendo un estándar de calidad de nivel ingeniería.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 border border-gray-700/50 hover:border-primary-500/30 transition-all">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Honestidad directa</h3>
                <p className="text-gray-300">Si tu branding no está listo, te recomiendo al profesional adecuado. Trabajamos con lo que realmente necesitas.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-xl p-8 border border-gray-700/50 hover:border-primary-500/30 transition-all">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Criterio estratégico</h3>
                <p className="text-gray-300">No solo diseño. Cada decisión se basa en aumentar conversiones y resultados medibles.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-800 rounded-xl p-8 md:col-span-2 border border-gray-700/50 hover:border-primary-500/30 transition-all">
                <div className="text-4xl mb-4">🔑</div>
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Propiedad Total</h3>
                <p className="text-gray-300">Sin arriendos. Eres dueño del 100% de tu código y sitio para siempre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque Activo 24/7 */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-900/30 via-primary-800/20 to-primary-900/30 border border-primary-700/50 rounded-2xl p-8 md:p-12 text-center">
            <div className="text-5xl mb-6">💼</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Tu Landing Page es un activo que trabaja para ti 24/7
            </h3>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Este es un sistema de ingeniería de tu propiedad, diseñado para capturar clientes de forma automática y valorizar tu marca frente a la competencia desde el primer día.
            </p>
          </div>
        </div>
      </section>

      {/* Qué incluye / No incluye Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div
            ref={queIncluyeRef.ref}
            className={`transition-all duration-700 ${
              queIncluyeRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Qué incluye
            </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary-400">✓ Incluye</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Landing page optimizada para conversión</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Copy estratégico y orientado a resultados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>2 rondas de revisión y ajustes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Soporte y ajustes durante 30 días</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Diseño responsive (mobile-first)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Configuración de Google Analytics 4 y Search Console: Para que sepas exactamente quién entra y cómo llega.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>Optimización de Velocidad Extrema: Tu página cargará en menos de 1.5 segundos, garantizado (vital para que no suba el costo de tus anuncios).</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-red-400">✗ No incluye</h3>
              <ul className="space-y-4 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Branding completo desde cero</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Diseño de logos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Cambios ilimitados sin mantenimiento</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Gestión de campañas publicitarias</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">✗</span>
                  <span>Desarrollo de sitios web complejos</span>
                </li>
              </ul>
            </div>
          </div>
          
            <div className="mt-12 bg-gradient-to-r from-primary-900/20 via-primary-800/20 to-primary-900/20 border border-primary-700 rounded-xl p-8 text-center">
              <p className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">Inversión desde $300 USD</p>
              <p className="text-gray-400 mb-6">Precio final según complejidad y necesidades específicas</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-2xl mb-2">💳</div>
                  <p className="text-sm text-gray-400 mb-1">Forma de Pago</p>
                  <p className="text-lg font-semibold text-white">50% inicial</p>
                  <p className="text-lg font-semibold text-white">50% contra entrega</p>
                </div>
                
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm text-gray-400 mb-1">Tiempo de Entrega</p>
                  <p className="text-lg font-semibold text-white">5-7 días hábiles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="dudas" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div
            ref={faqRef.ref}
            className={`transition-all duration-700 ${
              faqRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">¿Cuánto tiempo toma el proceso?</h3>
                <p className="text-gray-300">La landing page está lista en días, no semanas. Trabajamos de forma rápida sin sacrificar calidad.</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">¿Qué necesito para empezar?</h3>
                <p className="text-gray-300">Solo necesitas tener claro tu producto o servicio, y estar listo para invertir en resultados reales.</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-white">¿Incluye hosting y dominio?</h3>
                <p className="text-gray-300">No, el servicio se enfoca en la landing page optimizada para conversión. El hosting y dominio son responsabilidad del cliente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final y Formulario */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 scroll-mt-16">
        <div className="max-w-3xl mx-auto">
          <div
            ref={ctaFinalRef.ref}
            className={`transition-all duration-700 ${
              ctaFinalRef.isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                ¿Listo para convertir anuncios en clientes?
              </h2>
              <p className="text-xl text-gray-300 mb-4">
                Esta solución no es para todos.
              </p>
              <p className="text-lg text-gray-400">
                Es para negocios serios que ya invierten en anuncios y buscan resultados reales.
              </p>
            </div>

            <ContactForm />

            <p className="mt-8 text-center text-gray-400 text-sm">
              O escríbeme directamente a{' '}
              <a href="mailto:b.neculfilo@gmail.com" className="text-primary-400 hover:text-primary-300">
                b.neculfilo@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 30s;
          }
        }
      `}</style>
    </div>
  );
}
