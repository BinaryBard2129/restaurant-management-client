import React, { useContext, useEffect, useRef, useState } from "react";
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
      <li>
        <Link
          to="/"
          className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/allFoods"
          className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
        >
          All Foods
        </Link>
      </li>
      <li>
        <Link
          to="/gallery"
          className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
        >
          Gallery
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link
              to="/myFood"
              className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
            >
              My Foods
            </Link>
          </li>
          <li>
            <Link
              to="/addFood"
              className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
            >
              Add Food
            </Link>
          </li>
          <li>
            <Link
              to="/myOrders"
              className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
            >
              My Orders
            </Link>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <Link
              to="/login"
              className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="px-3 py-2 rounded hover:bg-red-100 hover:text-red-600 transition"
            >
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    // Outer div takes full width, sticky top, subtle shadow, and a nice gradient background
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-md z-50">
      {/* Inner container limits content width & adds horizontal padding */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white select-none hover:text-yellow-300 transition"
        >
          🍽️ DineFine
        </Link>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-6 text-white font-semibold text-lg">
          {menuItems}
        </ul>

        {/* User avatar dropdown for desktop */}
        {user && (
          <div
            className="hidden lg:flex items-center ml-6 relative"
            ref={dropdownRef}
          >
            <div
              className="cursor-pointer rounded-full border-2 border-yellow-300 p-[2px] hover:scale-110 transition-transform"
              onClick={() => setDropdownOpen((prev) => !prev)}
              title={user.displayName}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-48 bg-white rounded-lg shadow-lg overflow-hidden">
                <ul className="py-2 text-gray-700">
                  <li>
                    <Link
                      to="/myfoods"
                      className="block px-4 py-2 hover:bg-red-100 hover:text-red-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Foods
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/addfood"
                      className="block px-4 py-2 hover:bg-red-100 hover:text-red-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Add Food
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/myorders"
                      className="block px-4 py-2 hover:bg-red-100 hover:text-red-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition rounded-b"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg rounded-b-lg max-w-7xl mx-auto px-6 py-4">
          <ul className="space-y-3 text-gray-800 font-semibold text-lg">
            {menuItems}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
