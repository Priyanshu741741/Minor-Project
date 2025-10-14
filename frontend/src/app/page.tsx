import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { BentoGrid } from "@/components/BentoGrid";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <BentoGrid />
      </main>
    </div>
  );
}
