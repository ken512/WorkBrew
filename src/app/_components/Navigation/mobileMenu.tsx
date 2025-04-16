"use client";
import React from 'react';
import "../../globals.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose();
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <a
          href="#about"
          onClick={handleClick}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          WorkBrew
        </a>
        <a
          href="#features"
          onClick={handleClick}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          特徴
        </a>
        <a
          href="#usage"
          onClick={handleClick}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          使い方
        </a>
        <a
          href="/cafe_post"
          onClick={onClose}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          カフェ一覧
        </a>
      </div>
    </div>
  );
};