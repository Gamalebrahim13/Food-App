import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../../../assets/images/logo.png";
import { privateAxiosInstance, USERS_URLS } from "../../../Services/Urls/Urls"; 
import { toast } from "react-toastify"; // ✅ استيراد التوست

interface ChangePasswordModalProps {
  onClose: () => void;
}

export default function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }
    try {
      setLoading(true);
      const { data } = await privateAxiosInstance.put(USERS_URLS.Change_Pass, {
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      toast.success("Password changed successfully ✅");
      console.log(data);
      onClose(); // يقفل المودال بعد النجاح
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to change password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
        {/* زرار الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-green-600 hover:text-green-800"
        >
          <IoMdClose size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Food Recipe Logo" className="w-30 h-30" />
        </div>

        {/* العنوان */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Change Your Password
        </h2>
        <p className="text-gray-500 text-center mb-6">Enter your details below</p>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Old Password */}
          <div className="flex items-center border rounded px-3">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showOld ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full py-2 outline-none"
            />
            <button type="button" onClick={() => setShowOld(!showOld)}>
              {showOld ? "🙈" : "👁️"}
            </button>
          </div>

          {/* New Password */}
          <div className="flex items-center border rounded px-3">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-2 outline-none"
            />
            <button type="button" onClick={() => setShowNew(!showNew)}>
              {showNew ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded px-3">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full py-2 outline-none"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* زرار تغيير الباسورد */}
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 mt-6 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
