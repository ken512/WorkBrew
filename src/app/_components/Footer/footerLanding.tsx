"use client";
import React from 'react';
import { Coffee } from 'lucide-react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../../globals.css";

export const FooterLanding: React.FC = () => {
  return (
    <footer className="bg-tan-300 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column with logo and description */}
          <div>
            <div className="flex items-center mb-4">
              <Coffee className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold">WorkBrew</span>
            </div>
            <p className="text-white/90">
              あなたの作業をもっと快適に、
              <br />
              もっと生産的に。
            </p>
            <a
              href="https://www.instagram.com/workbrew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-4 text-white/90 hover:text-black transition-colors"
            >
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </div>

          {/* Right column with menu */}
          <div className="md:pl-8">
            <h4 className="text-lg font-semibold mb-4">メニュー</h4>
            <ul className="space-y-3">
              <li>
                <a href="/faq" className="text-white/90 hover:text-black transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/login" className="text-white/90 hover:text-black transition-colors">
                  ログイン
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white/90 hover:text-black transition-colors">
                  新規登録
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="text-center text-white/90">
            <p>© 2024 WorkBrew. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};