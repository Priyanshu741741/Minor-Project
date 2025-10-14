import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BentoGrid } from '../components/BentoGrid';

export function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BentoGrid />
    </div>
  );
}
