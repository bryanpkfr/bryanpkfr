import { useState, useEffect } from 'react';

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      setIsScrolled(scrollPosition > 20);
      setIsInHero(scrollPosition < heroHeight * 0.8); // Considera que está en hero hasta el 80% de la altura
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Altura del navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToForm = () => {
    scrollToSection('contact-form');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isInHero
          ? 'bg-transparent'
          : isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold text-white hover:text-primary-400 transition-colors"
          >
            Bryan Neculfilo
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('metodo')}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              El Método
            </button>
            <button
              onClick={() => scrollToSection('resultados')}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Resultados
            </button>
            <button
              onClick={() => scrollToSection('por-que-yo')}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Por qué yo
            </button>
            <button
              onClick={() => scrollToSection('dudas')}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Dudas
            </button>
            {!isInHero && (
              <button
                onClick={scrollToForm}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Agendar
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
