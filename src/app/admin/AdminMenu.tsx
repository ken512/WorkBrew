"use client";
import { NavLink } from "../_components/NavLink";
import { usePathname } from "next/navigation";
import { useRouteGuard } from "./_hooks/useRouteGuard";

const AdminMenu = () => {
  useRouteGuard();

  const pathname = usePathname();
  const isSelected = (href: string) => {
    return pathname.includes(href);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {" "}
      {/* paddingで全体の余白を設定 */}
      <ul className="flex">
        {" "}
        {/* ulのデフォルトスタイルをリセット */}
        <li className="relative w-1/5 h-15 bg-blue-100 hover:bg-blue-700 transition-colors duration-300">
          {" "}
          {/* relativeでドロップダウンを相対配置 */}
          <a
            href="#"
            className="flex justify-center items-center w-full h-full text-center text-blue-900 hover:text-white text-sm font-semibold transition-colors duration-300"
          >
            Menu
          </a>
          <ul className="absolute left-0 hidden mt-2 bg-white border border-gray-200 rounded-md shadow-md group-hover:block">
            {" "}
            {/* ドロップダウンメニュー */}
            <li>
              <NavLink
                href="/admin/home"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${isSelected('/admin/home') ? 'font-bold' : ''}`}
              >
                ホーム
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/admin/cafe-post"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  isSelected("/admin/cafe-post") ? "font-bold" : ""
                }`}
              >
                投稿
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/public/cafe-list"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  isSelected("/public/cafe-list") ? "font-bold" : ""
                }`}
              >
                投稿一覧
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/admin/cafe-favorites"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  isSelected("/admin/cafe-favorites") ? "font-bold" : ""
                }`}
              >
                お気に入り一覧
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/admin/user-account"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  isSelected("/admin/user-account") ? "font-bold" : ""
                }`}
              >
                ユーザーアカウント
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/public/FAQ"
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                  isSelected("/public/FAQ") ? "font-bold" : ""
                }`}
              >
                FAQ
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
