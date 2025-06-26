import React from "react";
import { FaPrayingHands, FaBible, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';  // Import Link for navigation

const Services = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen py-16">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Our <span className="text-yellow-500">Services</span>
        </h1>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          At Nexus Church, we are dedicated to providing a welcoming place for
          worship, study, and community engagement. Explore our services and
          join us on a spiritual journey.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
            <div className="text-yellow-500 text-5xl mb-4">
              <FaPrayingHands />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Sunday Worship Service
            </h2>
            <p className="text-gray-600 mb-4">
              Join us for a time of worship, prayer, and teaching from the Word
              of God, designed for all ages.
            </p>
            <span className="block text-gray-500 text-sm">⏰ 10:00 AM</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
            <div className="text-yellow-500 text-5xl mb-4">
              <FaBible />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Midweek Bible Study
            </h2>
            <p className="text-gray-600 mb-4">
              Engage in deeper Scripture study and fellowship in a warm,
              welcoming environment.
            </p>
            <span className="block text-gray-500 text-sm">⏰ Wednesday, 7:00 PM</span>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl transition-transform duration-300 hover:scale-105">
            <div className="text-yellow-500 text-5xl mb-4">
              <FaUsers />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Youth & Family Ministry
            </h2>
            <p className="text-gray-600 mb-4">
              A nurturing space for families and youth to grow in faith and
              build lasting connections.
            </p>
            <span className="block text-gray-500 text-sm">⏰ Sundays, 10:00 AM</span>
          </div>
        </div>

        {/* Contact Us Button with Link */}
        <div className="mt-12">
          <p className="text-xl text-gray-700 mb-4 max-w-xl mx-auto">
            We'd love to welcome you to our services! Feel free to reach out if
            you have any questions.
          </p>

          {/* Updated Button with Link */}
          <Link to="/contact">
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg">
              Contact Us
            </button>
            <p>Feel free to reach out with any questions or concerns. We’d love to connect with you!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
