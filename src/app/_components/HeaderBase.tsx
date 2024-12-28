"use client";
import React from "react";


export const HeaderBase: React.FC = () => {
  return (
    <header className="w-full min-h-36 flex justify-between py-6 px- h-15 bg-beige-200">
      <div className="my-6">
      <a href="/" className="px-10"> 
        WorkBrew
      </a>
      </div>
    </header>
  );
};
