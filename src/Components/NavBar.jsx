import React from 'react';

import { useContext, useEffect, useRef, useState } from "react";

import { AuthContext } from '../Pages/AuthProvider';
import { Link } from 'react-router';



const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/allfoods">All Foods</Link></li>
      <li><Link to="/gallery">Gallery</Link></li>
      {user && (
        <>
          <li><Link to="/myfoods">My Foods</Link></li>
          <li><Link to="/addfood">Add Food</Link></li>
          <li><Link to="/myorders">My Orders</Link></li>
        </>
      )}
      {!user && (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-white px-4 py-3 max-w-7xl mx-auto rounded-2xl shadow sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-red-500">
          🍽️ DineFine
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="menu menu-horizontal hidden lg:flex gap-4">
        {menuItems}
      </ul>

      {/* Profile Dropdown */}
      {user && (
        <div className="hidden lg:flex items-center ml-4 relative" ref={dropdownRef}>
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
            title={user.displayName}
          >
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-red-500"
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-40 bg-white shadow-md rounded z-50">
              <ul className="py-2">
                <li><Link to="/myfoods" className="block px-4 py-2 hover:bg-gray-100">My Foods</Link></li>
                <li><Link to="/addfood" className="block px-4 py-2 hover:bg-gray-100">Add Food</Link></li>
                <li><Link to="/myorders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white shadow-md rounded-lg p-4 lg:hidden z-50">
          <ul className="space-y-2">
            {menuItems}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
