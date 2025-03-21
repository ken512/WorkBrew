"use client";
import React from "react";
import { TopPageHeader } from "./_components/topPageHeader";
import { Sections } from "@/_data/Sections";
import "./globals.css";
const TopPage: React.FC = () => {
  return (
    <div>
      <TopPageHeader />
      {/* <img src="" alt="" /> */}
      <div className="min-h-[600px] flex flex-col items-center justify-center">
        <h1>WorkBrew</h1>
        <p>カフェ作業のための最適なプラットフォーム</p>
      </div>
      {Sections.map((section, index) => (
        <div key={index} className="bg-tan-300 min-h-screen flex flex-col items-center justify-center">
          <h1>{section.title}</h1>
          {/* <img src={section.image} alt={section.title} /> */}
          <h2>{section.description.heading}</h2>
          {section.description.paragraph && (
            <p>{section.description.paragraph}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopPage;
