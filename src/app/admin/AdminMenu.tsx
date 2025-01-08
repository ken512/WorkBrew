"use client";
import { NavLink } from "../_components/NavLink";
import { useRouteGuard } from "./_hooks/useRouteGuard";

const AdminMenu = () => {
  useRouteGuard();

  return (
    <div className="max-w-5xl mx-auto">
      <ul className="flex">
        <li className="relative w-1/5 h-15 bg-blue-100 hover:bg-blue-700 transition-colors duration-300">
          <a
            href="#"
            className="flex justify-center items-center w-full h-full text-center text-blue-900 hover:text-white text-sm font-semibold transition-colors duration-300"
          >
            Menu
          </a>
          <ul className="absolute left-0 hidden mt-2 bg-white border border-gray-200 rounded-md shadow-md group-hover:block">
            {/* ドロップダウンメニュー */}
            <NavLink href="/admin/home">ホーム</NavLink>
            <NavLink href="/admin/cafe_submission_form">投稿</NavLink>
            <NavLink href="/public/cafe-post">投稿一覧</NavLink>
            <NavLink href="/admin/cafe-favorites">お気に入り一覧</NavLink>
            <NavLink href="/admin/user-account">ユーザーアカウント</NavLink>
            <NavLink href="/public/faq">FAQ</NavLink>Ï
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
