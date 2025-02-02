"use client";
import React from "react";
import { HeaderBase } from "./HeaderBase";
import { MenuBar } from "./MenuBar";
import "../globals.css"
export const HeaderPublic: React.FC = () => {
  return (
    <div className="min-h-36 flex justify-between items-center px-[100px] font-bold bg-beige-200">
      <HeaderBase
        href="/home"
        className="font-pacifico text-4xl hover:text-customOrange transition-colors duration-300"
      >
        WorkBrew
      </HeaderBase>
      <div className="px-[200px]">
      <MenuBar />
      </div>
    </div>
  );
};
