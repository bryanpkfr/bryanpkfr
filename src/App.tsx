import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WebPage from './pages/WebPage';
import ParkourPage from './pages/ParkourPage';
import VideoPage from './pages/VideoPage';
import ContactPage from './pages/ContactPage';
import LandingAdsPage from './pages/LandingAdsPage';

function AppContent() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const isHomePage = location.pathname === '/';
  const isLandingAds = location.pathname === '/landing-ads';

  // Detectar idioma del navegador o usar el guardado
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || navigator.language.split('-')[0] || 'es';
    const validLanguages = ['es', 'en'];
    const language = validLanguages.includes(savedLanguage) ? savedLanguage : 'es';
    i18n.changeLanguage(language);
  }, [i18n]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && !isLandingAds && <Navigation />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web" element={<WebPage />} />
          <Route path="/parkour" element={<ParkourPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/landing-ads" element={<LandingAdsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AppContent />
    </Router>
  );
}

export default App;
