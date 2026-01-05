import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleWebClick = () => {
    navigate('/web');
  };

  const handleParkourClick = () => {
    navigate('/parkour');
  };

  const isSpanish = i18n.language === 'es';

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Contenedor principal - rectángulo completo */}
      <div className="relative w-full h-screen">
        {/* Triángulo inferior izquierdo - Desarrollo Web (diagonal de abajo izquierda a arriba derecha) */}
        <button
          onClick={handleWebClick}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 hover:opacity-95 transition-opacity duration-300 cursor-pointer group overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 0 100%, 100% 0)',
          }}
        >
          {/* Imagen de fondo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-70 transition-opacity"
            style={{
              backgroundImage: 'url(/images/devneon.webp)',
            }}
          />
          
          {/* Overlay oscuro para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-primary-900/70"></div>
          
          <div className="absolute inset-0 flex flex-col items-start justify-center pl-8 md:pl-16 text-white z-10">
            <div className="transform -rotate-90 origin-left mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                {isSpanish ? 'Desarrollo Web' : 'Web Development'}
              </h2>
              <div className="w-16 h-1 bg-primary-500 group-hover:w-24 transition-all"></div>
            </div>
          </div>
          {/* Overlay para hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        </button>

        {/* Triángulo superior derecho - Parkour Coach (diagonal de abajo izquierda a arriba derecha) */}
        <button
          onClick={handleParkourClick}
          className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary-900 via-primary-800 to-gray-900 hover:opacity-95 transition-opacity duration-300 cursor-pointer group overflow-hidden"
          style={{
            clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
          }}
        >
          {/* Imagen de fondo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-70 transition-opacity"
            style={{
              backgroundImage: 'url(/images/parkour.webp)',
            }}
          />
          
          {/* Overlay oscuro para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-bl from-primary-900/70 via-primary-800/60 to-gray-900/70"></div>
          
          <div className="absolute inset-0 flex flex-col items-end justify-center pr-8 md:pr-16 text-white z-10">
            <div className="transform rotate-90 origin-right mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                Parkour Coach
              </h2>
              <div className="w-16 h-1 bg-primary-500 ml-auto group-hover:w-24 transition-all"></div>
            </div>
          </div>
          {/* Overlay para hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        </button>
      </div>

      {/* Texto central mínimo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <h1 className="text-2xl md:text-4xl font-bold text-white/90 text-center mb-2 drop-shadow-lg">
          Bryan Neculfilo
        </h1>
        <p className="text-sm md:text-lg text-white/70 text-center drop-shadow-md">
          {isSpanish ? 'Desarrollador & Atleta' : 'Developer & Athlete'}
        </p>
      </div>
    </section>
  );
}
