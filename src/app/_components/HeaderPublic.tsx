"use client";
import React from "react";
import { HeaderBase } from "./HeaderBase";
import { MenuBarPublic } from "./MenuBarPublic";
import "../globals.css"
export const HeaderPublic: React.FC = () => {
  return (
    <div className="min-h-36 sm:min-h-20 flex justify-between items-center px-[100px] sm:px-[10px]  font-bold bg-beige-200">
      <HeaderBase
        href="/"
      >
        WorkBrew
      </HeaderBase>
      <div className="flex items-center space-x-40 sm:space-x-10">
      <MenuBarPublic />
      </div>
    </div>
  );
};
