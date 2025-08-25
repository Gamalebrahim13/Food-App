// src/components/Nodata.tsx

import noDataImg from "./../../assets/images/no-data.png"; // حط مكانها الصورة اللي عندك

export default function Nodata() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {/* الصورة */}
      <img
        src={noDataImg}
        alt="No Data"
        className="w-40 h-70 object-contain mb-4 opacity-80"
      />

      {/* العنوان */}
      <h2 className="text-xl font-semibold text-gray-700">No Data !</h2>

      {/* الرسالة */}
      <p className="text-gray-500 mt-2">
        Are you sure you want to delete this item ? <br />
        If you are sure just click on <span className="font-semibold text-red-500">Delete it</span>
      </p>
    </div>
  );
}
