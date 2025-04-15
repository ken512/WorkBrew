"use client";
import React from 'react';
import "../../globals.css";

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <a
          href="#about"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          WorkBrew
        </a>
        <a
          href="#features"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          特徴
        </a>
        <a
          href="#usage"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          使い方
        </a>
        <a
          href="/cafe_post"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#d6b288] hover:bg-gray-50"
        >
          カフェ一覧
        </a>
      </div>
    </div>
  );
};