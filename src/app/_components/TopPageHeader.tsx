"use client";
import React from "react";
import { LinkButton } from "./linkButton";
import { HeaderBase } from "./headerBase";

export const TopPageHeader: React.FC = () => {
  const containerStyles = "min-h-36 flex justify-between py-6 h-15 bg-beige-200";
  const navStyles = "my-6 flex flex-row items-center";
  const buttonContainerStyles = "flex justify-between my-5";

  return (
    <header className={containerStyles}>
      <div className={navStyles}>
        <HeaderBase href="#WorkBrewとは？" variant="default">
          WorkBrewとは？
        </HeaderBase>
        <HeaderBase href="#WorkBrewの特徴" variant="default">
          WorkBrewの特徴
        </HeaderBase>
        <HeaderBase href="#WorkBrewの使い方" variant="default">
          WorkBrewの使い方
        </HeaderBase>
      </div>
      <div className={buttonContainerStyles}>
        <LinkButton
          href="/cafe-post"
          type="button"
          variant="primary"
        >
          カフェ一覧
        </LinkButton>
        <LinkButton
          href="/login"
          type="button"
          variant="primary"
        >
          ログイン
        </LinkButton>
        <LinkButton
          href="/signup"
          type="button"
          variant="primary"
        >
          ユーザー登録
        </LinkButton>
      </div>
    </header>
  );
};
