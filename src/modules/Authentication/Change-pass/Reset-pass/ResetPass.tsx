import { useState } from "react";
import { MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ استدعاء التوستفاى
import "react-toastify/dist/ReactToastify.css"; 
import { publicAxiosInstance, USERS_URLS } from "../../../../Services/Urls/Urls";

export default function ResetPass() {
  const [email, setEmail] = useState("");
  const [seed, setSeed] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !seed || !password || !confirmPassword) {
      toast.error("All fields are required", { position: "top-right" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { position: "top-right" });
      return;
    }

    try {
      const res = await publicAxiosInstance.post(USERS_URLS.Reset_Pass, {
        email,
        seed,
        password,
        confirmPassword,
      });

      toast.success("Password reset successfully! Redirecting to login...", {
        position: "top-right",
      });
      console.log("Reset response:", res.data);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      console.error("Full error response:", err.response?.data);
      console.error("Additional Info Errors:", err.response?.data?.additionalInfo?.errors);
      toast.error(err.response?.data?.message || "Failed to reset password", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
      <p className="text-gray-500 text-center mb-6">
        Please enter the code sent to your email and set your new password
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-3 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Enter the code from email"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          className="w-full border rounded-lg px-3 py-3 focus:outline-none"
        />

        <div className="relative flex items-center border rounded-lg px-3">
          <MdLock className="text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-3 focus:outline-none"
          />
          <span
            className="absolute right-3 cursor-pointer text-gray-600"
            onClick={togglePassword}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="relative flex items-center border rounded-lg px-3">
          <MdLock className="text-gray-400" size={18} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-2 py-3 focus:outline-none"
          />
          <span
            className="absolute right-3 cursor-pointer text-gray-600"
            onClick={toggleConfirmPassword}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
        >
          Save New Password
        </button>
      </form>
    </div>
  );
}
