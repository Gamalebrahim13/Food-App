import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicAxiosInstance, USERS_URLS } from "../../../../Services/Urls/Urls";
import { MdEmail as Mail } from "react-icons/md";
import { FaLock as Lock } from "react-icons/fa";
import { FaEye as Eye, FaEyeSlash as EyeOff } from "react-icons/fa";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  userId: number;
  userName: string;
  userEmail: string;
  userGroup: string;
  roles: string[];
  iat: number;
  exp: number;
}

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) error = "Invalid email format";
    }

    if (name === "password") {
      if (!value.trim()) error = "Password is required";
      else if (value.length < 6) error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateForm = () => {
    validateField("email", formData.email);
    validateField("password", formData.password);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError("");

    try {
      const { data } = await publicAxiosInstance.post(USERS_URLS.Login, formData);

      console.log("Full Response:", data); // 👈 الرد اللي جاي من السيرفر

      if (data.token) {
        const decoded: DecodedToken = jwtDecode(data.token);

        // ✅ خزّن التوكن
        localStorage.setItem("token", data.token);

        // ✅ خزّن بيانات اليوزر بشكل مرتب
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: decoded.userId,
            name: decoded.userName,
            email: decoded.userEmail,
            group: decoded.userGroup,
            roles: decoded.roles,
          })
        );

        console.log("Decoded User:", decoded);
        console.log("Token:", data.token);

        navigate("/dashboard");
      } else {
        setServerError("No token returned from server");
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {serverError && (
        <div className="mb-3 text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {serverError}
        </div>
      )}

      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 ${
              errors.email
                ? touched.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-yellow-400 focus:ring-yellow-100"
                : "border-gray-300 focus:ring-green-200"
            }`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && (
          <p className={`text-sm mt-1 ${touched.email ? "text-red-500" : "text-yellow-500"}`}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={`w-full border rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 ${
              errors.password
                ? touched.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-yellow-400 focus:ring-yellow-100"
                : "border-gray-300 focus:ring-green-200"
            }`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className={`text-sm mt-1 ${touched.password ? "text-red-500" : "text-yellow-500"}`}>
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Link to="/forget-password" className="text-sm text-green-700 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white rounded-lg py-2 mt-2 hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <div className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-green-700 font-semibold hover:underline">
          Register Now
        </Link>
      </div>
    </form>
  );
}
