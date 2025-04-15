"use client";
import React from "react";
import { NavBar } from "./_components/Navigation/navBar";
import { HeroSection } from "./_components/Sections/heroSection";
import { FeaturesSection } from "./_components/Sections/featuresSection";
import { UsageSection } from "./_components/Sections/usageSection";
import { ScrollToTop } from "./_components/ScrollToTop/scrollToTop";
import { FooterLanding } from "./_components/Footer/footerLanding";
import { NewsSection } from "./_components/NewsSection/newsSection";
import "./globals.css";
const TopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fefce8]">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <UsageSection />
      <NewsSection/>
      <ScrollToTop />
      <FooterLanding />
    </div>
  );
};

export default TopPage;
