"use client";
import React from "react";
import { HeaderPublic } from "../_components/headerPublic";
import { Footer } from "../_components/footer";
import Image from "next/image";
import { faqData } from "@/_data/faqData";
import { FaqItem } from "../_components/faqItem";
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
      </div>
      <Footer />
    </div>
  );
};
export default faq;
