import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  console.log("hai");
  
  return (
    <div className="relative bg-black text-white text-center min-h-screen">
      {/* Hero Section (Background Image with Content Overlay) */}
      <div className="relative bg-black bg-opacity-50">
        <div className="absolute inset-0">
        <img
            src="/church_body.jpeg" // ✅ Corrected path
            alt="Church Background"
            className="w-full h-full object-cover brightness-75"
          />        </div>
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <h1 className="text-5xl font-extrabold leading-snug max-w-3xl">
            Welcome to{" "}
            <span className="text-yellow-400">Nexus Church</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl leading-relaxed">
            "A place of worship, faith, and community. Join us to experience the love of God, the power of prayer, and the warmth of fellowship."
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-6 flex space-x-4">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg">
  <Link to="/login" className="w-full h-full flex items-center justify-center">
    Join Us for Worship
  </Link>
</button>
            <button className="border border-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:bg-white hover:text-black shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-gray-100 text-black py-16 px-6">
        <div className="max-w-5xl mx-auto text-center" id="about">
          <h2 className="text-4xl font-bold text-yellow-400 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nexus Church is a community of faith, dedicated to spreading the message of love, hope, and unity. Our mission is to provide a space where people can worship, connect, and grow spiritually.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Vision</h3>
              <p className="text-gray-800">
                We envision a world transformed by faith, where everyone feels loved and empowered by God's grace.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Mission</h3>
              <p className="text-gray-800">
                To inspire and serve, sharing the gospel and fostering a strong, faith-filled community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Values</h3>
              <p className="text-gray-800">
                Love, faith, service, and inclusivity guide everything we do in our church and community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
