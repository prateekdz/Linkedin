import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold">
              L
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              LinkedIn
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Search"
              className="hidden md:inline-block px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:border border-gray-300"
            />

            <div className="flex gap-4">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Home
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Network
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:shadow-md transition"
              >
                {user?.firstName?.charAt(0)}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
