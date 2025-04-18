"use client";
import React, { useState } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import "../../globals.css";

export const NavBar:React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Coffee className="h-8 w-8 text-[#d6b288]" />
            <span className="ml-3 text-2xl font-bold text-[#d6b288]">WorkBrew</span>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#d6b288] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d6b288]"
            >
              <span className="sr-only">メニューを開く</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-1 sm:space-x-2 lg:space-x-8 items-center">
              <a 
                href="#about" 
                onClick={handleDesktopNavClick}
                className="text-gray-700 hover:text-[#d6b288] px-2 sm:px-3 py-2 text-sm lg:text-base font-medium whitespace-nowrap"
              >
                WorkBrewとは？
              </a>
              <a 
                href="#features" 
                onClick={handleDesktopNavClick}
                className="text-gray-700 hover:text-[#d6b288] px-2 sm:px-3 py-2 text-sm lg:text-base font-medium"
              >
                特徴
              </a>
              <a 
                href="#usage" 
                onClick={handleDesktopNavClick}
                className="text-gray-700 hover:text-[#d6b288] px-2 sm:px-3 py-2 text-sm lg:text-base font-medium"
              >
                使い方
              </a>
              <a 
                href="#cafes" 
                className="text-gray-700 hover:text-[#d6b288] px-2 sm:px-3 py-2 text-sm lg:text-base font-medium"
              >
                カフェ一覧
              </a>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </nav>
  );
};