import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicAxiosInstance, USERS_URLS } from "../../../../../Services/Urls/Urls";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md"; // استبدال Mail من lucide-react

export default function VerifyAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.code) {
      toast.error("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await publicAxiosInstance.put(USERS_URLS.VERIFY, formData);
      toast.success("🎉 Account verified successfully");
      navigate("/Login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "🚨 Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-green-700">
        Verify Your Account
      </h2>

      {/* Email */}
      <div className="relative">
        <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Verification Code */}
      <div className="relative">
        <input
          type="text"
          placeholder="Verification Code"
          className="w-full border rounded-lg py-2 pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-green-200 border-gray-300"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        />
      </div>

      {/* Verify Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Account"}
      </button>
    </form>
  );
}
