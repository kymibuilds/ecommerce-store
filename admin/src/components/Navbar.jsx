import React from "react";
import { assets } from "../assets/admin_assets/assets.js";

function Navbar({ setToken }) {
  return (
    <div className="flex items-center px-[4%] justify-between">
      <img className="w-[max(20%,160px)]" src={assets.logo} alt="" />
      <button
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
