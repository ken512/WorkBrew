"use client";
import React from "react";
import { NavBar } from "./_components/Navigation/NavBar";
import { HeroSection } from "./_components/Sections/HeroSection";
import { FeaturesSection } from "./_components/Sections/FeaturesSection";
import { UsageSection } from "./_components/Sections/UsageSection";
import { ScrollToTop } from "./_components/ScrollToTop/ScrollToTop";
import { FooterLanding } from "./_components/Footer/FooterLanding";
import { NewsSection } from "./_components/NewsSection/NewsSection";
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
