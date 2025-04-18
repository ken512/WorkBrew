"use client";
import React from "react";
import { HeaderPublic } from "../_components/HeaderPublic";
import { FooterDefault } from "../_components/Footer/FooterDefault";
import Image from "next/image";
import { faqData } from "@/_data/faqData";
import { FaqItem } from "../_components/FaqItem";
import "../globals.css";

const faq: React.FC = () => {
  return (
    <div>
      <HeaderPublic />
      <div className="bg-tan-300 min-h-screen flex flex-col items-center px-4 py-20 sm:px-2">
        <h1 className="text-3xl font-bold text-center mb-10">よくある質問</h1>

        {/* 画像 */}
        <Image
          src="/images/22395877-removebg-preview.png"
          alt="FAQ"
          width={670}
          height={370}
          className="w-[300px] md:w-[300px] lg:w-[400px] xl:w-[500px] h-auto mb-16 bg-tan-300"
        />
        {/* FAQ */}
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <p className="text-lg sm:text-sm font-bold text-black">
          その他ご不明点は、{" "}
          <a
            href="https://www.instagram.com/workbrew"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-2 sm:py-1 bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white rounded-full hover:from-[#C13584] hover:to-[#833AB4] transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            <i className="bi bi-instagram text-2xl sm:text-sm">InstagramのDM</i>
          </a>
          よりお気軽にお問い合わせください！
        </p>
        </div>
      </div>
      <FooterDefault />
    </div>
  );
};
export default faq;
