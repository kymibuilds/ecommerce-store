import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  // Redirect based on login state
  const handleAccountClick = () => {
    if (token) navigate("/profile");
    else navigate("/login");
  };

  // Handle logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Main Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile Icon + Dropdown */}
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
            onClick={handleAccountClick}
          />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
              {token ? (
                <>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/profile")}
                  >
                    My Profile
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={handleLogout}
                  >
                    Log Out
                  </p>
                </>
              ) : (
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => navigate("/login")}
                >
                  Login / Sign Up
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cart — visible only when logged in */}
        {token && (
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <p className="absolute -right-1.5 -bottom-1.5 flex items-center justify-center bg-black text-white rounded-full text-[9px] h-4 w-4">
              {getCartCount()}
            </p>
          </Link>
        )}

        {/* Menu icon for mobile */}
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6 text-gray-700 font-medium">
          <div className="flex justify-end">
            <img
              src={assets.cross_icon}
              className="w-5 cursor-pointer"
              alt="Close"
              onClick={() => setVisible(false)}
            />
          </div>

          <NavLink to="/" onClick={() => setVisible(false)}>
            HOME
          </NavLink>
          <NavLink to="/collection" onClick={() => setVisible(false)}>
            COLLECTION
          </NavLink>
          <NavLink to="/about" onClick={() => setVisible(false)}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" onClick={() => setVisible(false)}>
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
