// src/modules/Authentication/Change-pass/Forget-pass/ForgetPass.tsx
import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { publicAxiosInstance, USERS_URLS } from "../../../../Services/Urls/Urls";
import toast from "react-hot-toast";

export default function ForgetPass() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic Validation
    if (!email) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await publicAxiosInstance.post(USERS_URLS.Forget_Pass, {
        email,
      });

      console.log("Forget password response:", response.data);

      if (response.data?.message) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/ResetPass"), 2000);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      console.error("Forget password error:", err);

      if (err.response) {
        toast.error(err.response.data?.message || "Server error occurred");
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow animate-fadeIn">
      <h2 className="text-2xl font-bold text-center mb-2">Forgot Your Password?</h2>
      <p className="text-gray-500 text-center mb-6">
        No worries! Please enter your email and we will send a password reset link
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-400">
          <FaEnvelope className="text-gray-400" size={18} />
          <input
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-3 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center"
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Back to login */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Remembered your password?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-green-600 hover:underline"
        >
          Back to Login
        </button>
      </p>
    </div>
  );
}
