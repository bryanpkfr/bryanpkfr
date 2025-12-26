import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Achievements />
      <Services />
      <Contact />
    </>
  );
}

