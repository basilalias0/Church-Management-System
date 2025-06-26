import React from "react";
import { Link } from "react-router-dom"; // ✅ Importing Link from React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-400">
          Nexus Church
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          </li>
          
          <li>
            <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          </li>
          <li>
            <Link to="/mission" className="hover:text-yellow-400 transition">Mission</Link>
          </li>
          <li>
            <Link to="/gallery" className="hover:text-yellow-400 transition">Gallery</Link>
          </li>
          {/* <li>
            <Link to="/parish-directory" className="hover:text-yellow-400 transition">Parish Directory</Link>
          </li> */}
          <li>
            <Link to="/donation" className="hover:text-yellow-400 transition">Donation</Link>
          </li>
          <li>
            <Link to="/past-vicars" className="hover:text-yellow-400 transition">Past Vicars</Link>
          </li>
          
          {/* <li>
            <Link to="/image" className="hover:text-yellow-400 transition">Image Upload Gallery</Link>
          </li> */}
          
      
          
          {/* Login Button */}
          {/* <li>
            <Link
              to="/login"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
            >
              Login
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
