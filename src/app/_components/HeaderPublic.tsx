"use client";
import React from "react";
import { HeaderBase } from "./headerBase";
import { MenuBarPublic } from "./MenuBarPublic";
import "../globals.css"
export const HeaderPublic: React.FC = () => {
  return (
    <div className="min-h-36 flex justify-between items-center px-[100px] font-bold bg-beige-200">
      <HeaderBase
        href="/home"
      >
        WorkBrew
      </HeaderBase>
      <div className="px-[200px]">
      <MenuBarPublic />
      </div>
    </div>
  );
};
