import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { publicAxiosInstance, USERS_URLS } from "../../../../Services/Urls/Urls";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaEye, FaEyeSlash, FaGlobe } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    country: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Validation
  const validate = () => {
    if (!formData.userName.match(/^[a-zA-Z0-9]+([a-zA-Z0-9]|\s)*$/)) {
      toast.error("❌ Username must contain only letters & numbers");
      return false;
    }
    if (
      !formData.email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      toast.error("❌ Invalid email format");
      return false;
    }
    if (!/^01[0-9]{9}$/.test(formData.phoneNumber)) {
      toast.error("❌ Invalid Egyptian phone number");
      return false;
    }
    if (
      !formData.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?:{}|<>])/
      )
    ) {
      toast.error(
        "❌ Password must include lowercase, uppercase, number & special char"
      );
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("❌ Passwords do not match");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await publicAxiosInstance.post(USERS_URLS.Register, formData);
      toast.success("🎉 Registered successfully");
      navigate("/VerifyAccount"); // ✅ بعد الريجستر يروح على Verify
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 2 inputs per row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Username */}
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Country */}
        <div className="relative">
          <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone"
            className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
          </button>
        </div>
      </div>

      {/* Register button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Register"}
      </button>

      {/* Link to Verify */}
      <div className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-green-700 font-semibold hover:underline">
          Login Now
        </Link>
      </div>
    </form>
  );
}
