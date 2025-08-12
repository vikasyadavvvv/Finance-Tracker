import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaWallet, FaBars, FaTimes } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex items-center flex-shrink-0">
            <GiMoneyStack className="text-2xl text-amber-400" />
            <span className="ml-2 text-xl font-bold flex items-center">
              <FaWallet className="mr-2 text-amber-300" />
              <span className="hidden sm:inline">Finance Tracker</span>
              <span className="sm:hidden">Finance Tracker</span>
            </span>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all shadow hover:shadow-lg text-sm"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-300 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only shows Logout button */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 w-full"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}