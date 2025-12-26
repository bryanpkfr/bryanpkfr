import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WebPage from './pages/WebPage';
import ParkourPage from './pages/ParkourPage';
import VideoPage from './pages/VideoPage';
import ContactPage from './pages/ContactPage';

function AppContent() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const isHomePage = location.pathname === '/' || location.pathname.match(/^\/(en|es)$/);

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <Navigation />}
      <main className="flex-grow">
        <Routes>
          <Route path="/:locale" element={<HomePage />} />
          <Route path="/:locale/web" element={<WebPage />} />
          <Route path="/:locale/parkour" element={<ParkourPage />} />
          <Route path="/:locale/video" element={<VideoPage />} />
          <Route path="/:locale/contact" element={<ContactPage />} />
          <Route path="/web" element={<Navigate to={`/${i18n.language}/web`} replace />} />
          <Route path="/parkour" element={<Navigate to={`/${i18n.language}/parkour`} replace />} />
          <Route path="/video" element={<Navigate to={`/${i18n.language}/video`} replace />} />
          <Route path="/contact" element={<Navigate to={`/${i18n.language}/contact`} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
