import { Outlet, useLocation } from "react-router-dom";
import bgImage from "../../../assets/images/bg-img.png"; 
import logo from "../../../assets/images/logo.png";

export default function AuthLayout() {
  const location = useLocation();

  // نحدد العنوان حسب الراوت
  const getTitle = () => {
    if (location.pathname.includes("login")) return "Login";
    if (location.pathname.includes("register")) return "Register";
    if (location.pathname.includes("forget-password")) return "Forgot Password";
    if (location.pathname.includes("reset-password")) return "Reset Password";
    if (location.pathname.includes("verify")) return ""; // 👈 نخليها فاضية
    return "";
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-green-50 relative">
      {/* Background */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay عشان الغمقان */}
      <div className="absolute inset-0 bg-white/60" />

      {/* الفورم + اللوجو */}
      <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg w-[600px]">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="h-30 w-30 mb-2" />
          {/* 👇 مش هيظهر إلا لو فيه قيمة */}
          {getTitle() && (
            <h2 className="text-xl font-semibold text-gray-800">
              {getTitle()}
            </h2>
          )}
        </div>

        {/* هنا الفورم اللي بيتغير حسب الراوت */}
        <Outlet />
      </div>
    </div>
  );
}
