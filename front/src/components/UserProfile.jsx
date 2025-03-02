import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true, // Ensure cookies are sent
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
        navigate("/login"); // Redirect if not logged in
      }
    };

    fetchUserProfile();
  }, [navigate]);
return user ? (
  <div className="h-screen flex items-center justify-center bg-[#309696]">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    {user ? (
      <div className="text-center space-y-6">
        {/* الصورة الشخصية */}
        <div className="flex justify-center">
          <img
            src={user.profileImage || "https://via.placeholder.com/100"}
            alt="الصورة الشخصية"
            className="w-24 h-24 rounded-full border-4 border-[#309696] shadow-md"
          />
        </div>

        <h2 className="text-2xl font-semibold text-[#309696]">الملف الشخصي</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-bold text-gray-900">الاسم:</span>
            <span className="text-left">{user.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-bold text-gray-900">البريد الإلكتروني:</span>
            <span className="text-left">{user.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-bold text-gray-900">رقم الهاتف:</span>
            <span className="text-left">{user.phone || "غير متوفر"}</span>
          </div>
        </div>

        {/* زر تعديل الملف الشخصي */}
        <button className="w-full bg-[#309696] text-white py-3 rounded-md hover:bg-[#257a7a] transition">
          تعديل الملف الشخصي
        </button>
      </div>
    ) : (
      <p className="text-center text-gray-600">جارِ التحميل...</p>
    )}
  </div>
</div>

) : (
  <p>جارِ التحميل...</p>
);



};

export default UserProfile;
