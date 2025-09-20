import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { shopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";

export const Navbar = () => {
  const [visible, setVisible] = useState(false); // Mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // Profile dropdown
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(shopContext);
  const location = useLocation();

  const links = [
    { to: "/", label: "HOME" },
    { to: "/collection", label: "COLLECTION" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    toast.success("Logout successfully!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-10 bg-white shadow-md">
      {/* Logo */}
      <Link to="/">
        <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#06f7f7] to-[#06858e] bg-clip-text text-transparent tracking-wide">
          Outflair
        </h3>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-black" : "text-gray-700"}`
            }
          >
            {({ isActive }) => (
              <>
                <p>{link.label}</p>
                {isActive && <span className="block w-2/4 h-[1.5px] bg-gray-700 rounded-full"></span>}
              </>
            )}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        {/* Search */}
        {location.pathname === "/collection" && (
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
          />
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <img
            onClick={() => {
              if (!token) navigate("/login");
              else setDropdownOpen((prev) => !prev);
            }}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
          {token && dropdownOpen && (
            <div className="absolute right-0 mt-2 z-50 bg-white shadow-lg rounded-md w-36 border border-gray-200">
              <div className="flex flex-col gap-2 py-3 px-5 text-gray-700">
                <p className="cursor-pointer hover:text-black" onClick={() => { navigate("/profile"); setDropdownOpen(false); }}>My Profile</p>
                <p className="cursor-pointer hover:text-black" onClick={() => { navigate("/orders"); setDropdownOpen(false); }}>Orders</p>
                <p className="cursor-pointer hover:text-black" onClick={() => { logout(); setDropdownOpen(false); }}>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="cart" />
          {getCartCount() > 0 && (
            <span className="absolute -right-1 -bottom-1 w-4 h-4 text-[8px] bg-black text-white rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ${
          visible ? "w-64" : "w-0"
        } overflow-hidden z-50`}
      >
        <div className="flex flex-col h-full" onClick={() => setVisible(false)}>
          <div className="flex items-center gap-4 p-3 cursor-pointer border-b">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>
          <div className="flex flex-col text-gray-700 font-medium p-4 gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setVisible(false)}
                className={({ isActive }) => (isActive ? "text-[#06858e]" : "hover:text-[#06858e]")}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
