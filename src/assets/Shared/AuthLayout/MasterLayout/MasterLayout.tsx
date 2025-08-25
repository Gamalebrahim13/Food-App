// src/assets/Shared/AuthLayout/MasterLayout/MasterLayout.tsx
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import { FaUsers, FaTableCells } from "react-icons/fa6";
import {
  FaHeart,
  FaClipboardList,
  FaLock,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import logopng from "../../../../assets/images/side-logo.png";
import avatarpng from "../../../../assets/images/Ellipse 234.png";

// الهيدرات لكل صفحة
import homeHeader from "../../../../assets/images/home_img (2).png";
import recipesHeader from "../../../../assets/images/recipes_img (1).png";
import favoritesHeader from "../../../../assets/images/recipes_img (1).png";
import usersHeader from "../../../../assets/images/recipes_img (1).png";
import categoriesHeader from "../../../../assets/images/recipes_img (1).png";

import ChangePasswordModal from "../../../../modules/Authentication/Change-pass/ChangePass";

interface DecodedToken {
  name?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

const pageHeaders: Record<
  string,
  { title: string; desc: string; img: string }
> = {
  "/dashboard/home": {
    title: "Welcome Home",
    desc: "Overview of your dashboard",
    img: homeHeader,
  },
  "/dashboard/users": {
    title: "Users Management",
    desc: "You can manage, edit and delete users here",
    img: usersHeader,
  },
  "/dashboard/recipes": {
    title: "Recipes items",
    desc: "Manage and add new recipes",
    img: recipesHeader,
  },
  "/dashboard/favorite": {
    title: "Your Favorites",
    desc: "All the items you marked as favorite",
    img: favoritesHeader,
  },
  "/dashboard/categories": {
    title: "Categories",
    desc: "Organize and manage all categories for your items",
    img: categoriesHeader,
  },
};

export default function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");

  // ✅ حالة المودال
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const currentHeader = pageHeaders[location.pathname] || {
    title: "Dashboard",
    desc: "Manage your data easily",
    img: "",
  };

  // ✅ دالة تحديث اليوزر
  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      // ✅ لو موجود user في localStorage (من اللوجين)
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || parsedUser.email || "User");
      } else {
        // fallback من التوكن
        setUserName(decoded.name || decoded.email || "User");
      }
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  useEffect(() => {
    // أول تحميل
    loadUser();

    // ✅ لما يحصل تغيير في localStorage
    const handleStorageChange = () => {
      loadUser();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#0f1c3f] text-white flex flex-col rounded-tr-[40px]">
        <div className="h-20 flex items-center justify-center border-b border-gray-700">
          <img src={logopng} alt="Logo" className="h-25 w-25 object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaHome /> <span>Home</span>
          </NavLink>

          <NavLink
            to="/dashboard/users"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaUsers /> <span>Users</span>
          </NavLink>

          <NavLink
            to="/dashboard/recipes"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaClipboardList /> <span>Recipes</span>
          </NavLink>

          <NavLink
            to="/dashboard/favorite"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaHeart /> <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-800" : ""
              }`
            }
          >
            <FaTableCells /> <span>Categories</span>
          </NavLink>

          {/* ✅ زرار فتح المودال */}
          <button
            onClick={() => setIsChangePasswordOpen(true)}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 w-full text-left"
          >
            <FaLock /> <span>Change Password</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded hover:bg-red-600 w-full"
          >
            <FaSignOutAlt /> <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Navbar */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b flex items-center justify-between px-6">
          <div className="font-bold text-lg"></div>
          <div className="flex items-center space-x-4">
            <img src={avatarpng} alt="avatar" className="w-8 h-8 rounded-full" />
            <span className="font-medium">{userName}</span>

            <button className="relative">
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
          </div>
        </header>

        {/* Green Header */}
        <div className="bg-green-600 text-white p-8 flex justify-between items-center mx-6 mt-6 rounded-2xl">
          <div>
            <h2 className="text-2xl font-bold">{currentHeader.title}</h2>
            <p className="text-2sm">{currentHeader.desc}</p>
          </div>
          {currentHeader.img && (
            <img src={currentHeader.img} alt="illustration" className="h-25" />
          )}
        </div>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* ✅ مودال تغيير الباسورد */}
      {isChangePasswordOpen && (
        <ChangePasswordModal onClose={() => setIsChangePasswordOpen(false)} />
      )}
    </div>
  );
}
