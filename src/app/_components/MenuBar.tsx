"use client";
import { NavLink } from "./NavLink";
import { useRouteGuard } from "../admin/_hooks/useRouteGuard";
import "../globals.css";

export const MenuBar = () => {
  useRouteGuard();

  return (
    <div className="mx-auto">
      <ul className="flex">
        <li className="relative  h-10  transition-colors duration-300 group">
          <a
            href="#"
            className="flex text-2xl justify-center items-center w-full h-full text-center text-blue-900 hover:text-customOrange transition-colors duration-300"
          > 
            Menu
          </a>
          <ul className="absolute left-0 hidden bg-white border border-gray-200 rounded-md shadow-md group-hover:block group-hover:z-10">
            {/* ドロップダウンメニュー */}
            <NavLink href="/admin/home">ホーム</NavLink>
            <NavLink href="/admin/cafe_submission_form">投稿</NavLink>
            <NavLink href="/cafe_post">投稿一覧</NavLink>
            <NavLink href="/admin/cafe_favorites">お気に入り一覧</NavLink>
            <NavLink href="/admin/user_account">ユーザーアカウント</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/">トップ</NavLink>
          </ul>
        </li>
      </ul>
    </div>
  );
};


