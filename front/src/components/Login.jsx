import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send request with credentials (cookies)
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true } // Important to include this
      );
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.user,
      });
      localStorage.setItem("token", res.data.token); // Save token to localStorage
      navigate("/profile"); // Redirect to profile page
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
        payload: err.response ? err.response.data.message : "Server error",
      });
    }
  };

  const handleRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="h-screen flex">
      {/* خلفية الصفحة */}
      <div className="flex-1 bg-[#309696] flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">مشكاة</h1>
      </div>

      {/* نموذج تسجيل الدخول */}
      <div className="w-1/3 flex items-center justify-center p-6">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#309696]">
            تسجيل الدخول
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309696]"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#309696]"
            />
            <button
              type="submit"
              className="w-full bg-[#309696] text-white py-3 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#309696]"
            >
              تسجيل الدخول
            </button>
          </form>
          {error && (
            <div className="text-red-500 mt-2 text-center">{error}</div>
          )}
          <p className="mt-4 text-center">
            ليس لديك حساب؟{" "}
            <span
              onClick={handleRedirect}
              className="text-[#309696] cursor-pointer hover:underline"
            >
              إنشاء حساب
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
