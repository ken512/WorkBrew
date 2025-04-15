"use client";
import React from "react";
import "../../globals.css";

export const FooterDefault: React.FC = () => {
  return (
    <footer className="bg-tan-300 text-white py-6 text-sm w-full px-4 sm:px-6 lg:px-10">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-start mb-10">
          <a
            href="/home"
            className="text-5xl sm:text-3xl md:text-4xl mt-9 font-pacifico hover:text-black"
          >
            WorkBrew
          </a>
          <div className="flex flex-col items-start space-y-1 text-xl font-bold sm:text-sm md:text-base">
            <a href="/faq" className="hover:text-black">FAQ</a>
            <a href="/login" className="hover:text-black">ログイン</a>
            <a href="/signup" className="hover:text-black">サインアップ</a>
            <a
              href="https://www.instagram.com/workbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-white/90 hover:text-black transition-colors"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-white w-full mb-2" />

        <div className="text-center text-lg font-bold flex items-center justify-center gap-5">
          <span>© 2025 WorkBrew. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};