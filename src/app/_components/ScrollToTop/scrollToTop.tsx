"use client";
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import "../../globals.css";

export const ScrollToTop:React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white p-4 rounded-full shadow-lg transition-opacity duration-300 hover:bg-orange-600 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};