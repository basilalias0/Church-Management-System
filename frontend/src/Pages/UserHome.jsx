import React from "react";

const UserHome = () => {
  return (
    <div className="relative bg-black text-white text-center min-h-screen">
      {/* Hero Section (Background Image with Content Overlay) */}
      <div className="relative bg-black bg-opacity-50">
        <div className="absolute inset-0">
        <img
            src="/church2.jpeg" // ✅ Corrected path
            alt="Church Background"
            className="w-full h-full object-cover brightness-75"
          />
        </div>
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
              Join Us for Worship
            </button>
            <button className="border border-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:bg-white hover:text-black shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default UserHome;
