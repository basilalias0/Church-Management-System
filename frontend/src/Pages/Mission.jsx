import React from "react";

const Mission = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-16 px-6">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Our Mission</h1>
        <p className="text-lg text-gray-700 mb-12 leading-relaxed">
          We are a church committed to spreading God's message of love, 
          building a strong community, and serving those in need with faith and compassion.
        </p>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a church that serves as a beacon of hope, inspiring believers 
              to grow in faith and extend God's love beyond the walls of the church.
            </p>
          </div>

          {/* Core Values Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-blue-600">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Core Values</h2>
            <ul className="text-left text-gray-700 space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span> Faith: Grounded in God's promises.
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span> Community: Growing together in love.
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span> Service: Giving as Christ gave.
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 text-xl mr-2">✔</span> Outreach: Sharing the Gospel worldwide.
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-blue-600 text-white py-4 px-10 rounded-xl shadow-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300">
            Join the Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mission;
