import React from 'react';
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { HeroSection2 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-2";
import { LogoSection10 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import TestimonialsSection1 from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-section-1";
import { BentoGrid6 } from "@/components/pro-blocks/landing-page/bento-grids/bento-grid-6";
import { FeatureSection9 } from "@/components/pro-blocks/landing-page/feature-sections/feature-section-9";
import { StatsSection4 } from "@/components/pro-blocks/landing-page/stats-sections/stats-section-4";
import { FaqSection2 } from "@/components/pro-blocks/landing-page/faq-sections/faq-section-2";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";

export default function Home() {
  return (
    <main>
      <LpNavbar1 />
      <HeroSection2 />
      <LogoSection10 />
      <TestimonialsSection1
        quote="PEC Dispensary has transformed how we manage patient care. The NLP-powered feedback analysis helps us identify health trends early and respond quickly."
        authorName="Dr. Arjun Mehta"
        authorRole=""
        avatarSrc="/DavidPark.png"
      />
      <BentoGrid6 />
      <FeatureSection9 />
      <StatsSection4 />
      <TestimonialsSection1
        quote="The automated prescription tracking and patient visit management has reduced administrative work by 60%. We can now focus more on patient care!"
        authorName="Dr. Priya Sharma"
        authorRole=""
        avatarSrc="/MonicaKurt.png"
      />
      <FaqSection2 />
      <Footer1 />
    </main>
  );
}
