import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"; // إذا كنت تستخدم axios

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // تحقق من وجود التوكن
    const token = Cookies.get("token");
    console.log("التوكن قبل الحذف:", token);

    if (token) {
      try {
        // إرسال طلب لتسجيل الخروج (اختياري: إذا كان لديك خادم يحتاج للتعامل مع تسجيل الخروج)
        await axios.post("/api/logout", {}, { withCredentials: true });

        // حذف التوكن
        Cookies.remove("token", { path: "/", domain: "localhost" }); // تغيير النطاق إذا لزم الأمر
        console.log("تم حذف التوكن:", Cookies.get("token")); // تحقق من الحذف
      } catch (error) {
        console.error("خطأ في تسجيل الخروج:", error);
      }
    } else {
      console.log("لا يوجد توكن لحذفه");
    }

    navigate("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around items-center text-white space-x-4">
        <li>
          <Link to="/login" className="hover:text-gray-400">
            تسجيل الدخول
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-400">
            تسجيل
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-gray-400">
            الملف الشخصي
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            تسجيل الخروج
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
