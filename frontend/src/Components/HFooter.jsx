import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Column 1: Church Info */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Nexus Church</h2>
            <p className="mt-4 text-gray-400">
              A place of worship, faith, and community. Join us to experience the love of God, the power of prayer, and the warmth of fellowship.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-400 transition">About Us</a></li>
              <li><a href="/services" className="hover:text-yellow-400 transition">Services</a></li>
              <li><a href="/mission" className="hover:text-yellow-400 transition">Our Mission</a></li>
              <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Login Dropdown */}
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="mt-4 flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-yellow-400" /> Assumption Forona Church, Erumely, India
            </p>
            <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <FaPhone className="text-yellow-400" /> +123 456 7890
            </p>
            <p className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-yellow-400" /> contact@nexuschurch.com
            </p>

            {/* Login Dropdown (Text Only) */}
            <div className="relative mt-6">
              <p 
                className="cursor-pointer text-yellow-400 hover:underline flex items-center gap-1"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <FaUser /> Login
              </p>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                  <p
                    onClick={() => navigate("/admin-login")}
                    className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer"
                  >
                    Admin Login
                  </p>
                  <p
                    onClick={() => navigate("/accountant-login")}
                    className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer"
                  >
                    Accountant Login
                  </p>
                  <p
                    onClick={() => navigate("/vicar-login")}
                    className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer"
                  >
                    Vicar Login
                  </p>
                  <p
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-white hover:bg-gray-700 transition cursor-pointer"
                  >
                    User Login
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition"><FaYoutube size={24} /></a>
          </div>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} Nexus Church. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
