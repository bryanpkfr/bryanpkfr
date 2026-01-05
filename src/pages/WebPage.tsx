import { useNavigate } from 'react-router-dom';

export default function WebPage() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icono de construcción */}
        <div className="text-8xl md:text-9xl mb-8 animate-pulse">
          🚧
        </div>
        
        {/* Título */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
          En Construcción
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Estamos trabajando en algo increíble. Esta sección estará disponible pronto.
        </p>
        
        {/* Botón para volver */}
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Volver al Inicio
        </button>
      </div>
      
      {/* Efecto de fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>
  );
}

