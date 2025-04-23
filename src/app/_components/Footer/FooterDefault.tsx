"use client";
import React from "react";
import { Coffee } from "lucide-react";
import "../../globals.css";

export const FooterDefault: React.FC = () => {
  return (
    <footer className="bg-tan-300 text-white py-6 text-sm w-full px-4 sm:px-6 lg:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-start mb-10">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mt-[70px]">
            <Coffee className="h-8 w-8 sm:h-6 sm:w-6 text-white" />
            <a href="/admin/home" className="ml-3 text-2xl sm:text-lg font-bold text-white">WorkBrew</a>
          </div>
          <div className="flex flex-col items-start space-y-1 text-xl font-bold sm:text-sm md:text-base">
            <a href="/faq" className="hover:text-black">
              FAQ
            </a>
            <a href="/login" className="hover:text-black">
              ログイン
            </a>
            <a href="/signup" className="hover:text-black">
              新規登録
            </a>
            <a
              href="https://www.instagram.com/workbrew_info/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-white/90 hover:text-black transition-colors"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-white w-full mb-16" />

        <div className="text-center text-sm font-bold flex items-center justify-center">
          <span>© 2025 WorkBrew. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
