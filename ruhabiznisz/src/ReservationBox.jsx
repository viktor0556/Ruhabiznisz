import React from "react";

const ReservationBox = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
      <div className="bg-[#1a1a1a] text-white p-6 rounded-md w-full max-w-sm shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>
        <h3 className="text-lg font-bold mb-2">Termék lefoglalása</h3>
        <p className="text-sm mb-2">Vedd fel velünk a kapcsolatot:</p>
        <ul className="space-y-1 text-sm">
          <li>📞 <span className="font-medium">+36 20 123 4567</span></li>
          <li>
            📩{" "}
            <a href="mailto:info@valami.hu" className="underline">
              info@valami.hu
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReservationBox;
