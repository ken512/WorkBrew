"use client";
import { NavLink } from "../../_components/NavLink";
import { useRouteGuard } from "../_hooks/useRouteGuard";
import "../../globals.css";

export const MenuBarAdmin = () => {
  useRouteGuard();

  return (
    <div className="mx-auto">
      <ul className="flex">
        <li className="relative h-[60px] transition-colors duration-300 group">
          <a
            href="#"
            className="flex text-2xl sm:text-sm md:px-10 justify-center items-center w-full  h-full text-center text-blue-900 hover:text-customOrange transition-colors duration-300"
          > 
            Menu
          </a>
          <ul className="absolute left-0 hidden sm:text-sm  bg-white border border-gray-200 rounded-md shadow-md group-hover:block group-hover:z-10">
            {/* ドロップダウンメニュー */}
            <NavLink href="/admin/home">ホーム</NavLink>
            <NavLink href="/admin/cafe_submission_form">投稿</NavLink>
            <NavLink href="/cafe_post">投稿一覧</NavLink>
            <NavLink href="/admin/cafe_favorite">お気に入り一覧</NavLink>
            <NavLink href="/admin/user_account">ユーザーアカウント</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/">トップ</NavLink>
          </ul>
        </li>
      </ul>
    </div>
  );
};


