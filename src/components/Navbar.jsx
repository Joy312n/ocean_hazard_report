import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold text-white">
            Civic Reports
          </NavLink>
          <div className="flex items-center space-x-6 text-lg">
            <NavLink to="/" className="text-white hover:text-blue-200">Home</NavLink>
            <NavLink to="/submit-report" className="text-white hover:text-blue-200">Submit Report</NavLink>
            <NavLink to="/map-view" className="text-white hover:text-blue-200">Map View</NavLink>
            <NavLink to="/social-feed" className="text-white hover:text-blue-200">Social Feed</NavLink> {/* <-- Add new link */}
            {token ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Hi, {userName || 'User'}</span>
                <button onClick={handleLogout} className="bg-white text-blue-600 font-semibold py-2 px-5 rounded-md hover:bg-gray-100">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login" className="bg-white text-blue-600 font-semibold py-2 px-5 rounded-md hover:bg-gray-100">
                  Login
                </NavLink>
                <NavLink to="/signup" className="border border-white text-white font-semibold py-2 px-5 rounded-md hover:bg-white hover:text-blue-600">
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;