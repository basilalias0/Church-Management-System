import React, { useState } from "react";
import { FileText, FileSearch, Home, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";
import ViewPetitions from "../Pages/ViewPetitions";
import BalanceSheet from "../Pages/BalanceSheet";
import ParishList from "../Pages/ParishList"; // ✅ Import ParishList

const VicarDashboard = () => {
  const [showPetitions, setShowPetitions] = useState(false);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showParishList, setShowParishList] = useState(false); // ✅ New state
  

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/public/church8.jpeg')" }}
    >
      <div className="backdrop-blur-sm bg-white/70 p-8 rounded-xl shadow-xl max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">
          Vicar Dashboard
        </h1>

        {/* Conditional Rendering */}
        {showPetitions ? (
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <button
              onClick={() => setShowPetitions(false)}
              className="text-blue-500 underline mb-4"
            >
              ← Back to Dashboard
            </button>
            <ViewPetitions />
          </div>
        ) : showBalanceSheet ? (
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <button
              onClick={() => setShowBalanceSheet(false)}
              className="text-blue-500 underline mb-4"
            >
              ← Back to Dashboard
            </button>
            <BalanceSheet />
          </div>
        ) : showParishList ? ( // ✅ Show Parish Directory here
          <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
            <button
              onClick={() => setShowParishList(false)}
              className="text-blue-500 underline mb-4"
            >
              ← Back to Dashboard
            </button>
            <ParishList />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* View Petitions */}
            <div
              onClick={() => setShowPetitions(true)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Petitions</h3>
              <p className="text-gray-600 text-sm mt-1">
                Check and review submitted petitions.
              </p>
            </div>

            {/* View Balance Sheet */}
            <div
              onClick={() => setShowBalanceSheet(true)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <FileSearch className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Reports</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access financial and community reports.
              </p>
            </div>

            {/* View Parish Directory */}
            <div
              onClick={() => setShowParishList(true)}
              className="cursor-pointer p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <FileSearch className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold">View Parish Directory</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access Parish Members List.
              </p>
            </div>

            {/* Create Event */}
            <Link to="/event">
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                <CalendarPlus className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold">Create Event</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Add and manage upcoming church events.
                </p>
              </div>
            </Link>
            {/* Create chart */}
            <Link to="/donation-chart">
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                <CalendarPlus className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold">Pie Chart</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Add and manage upcoming church events.
                </p>
              </div>
            </Link>

            {/* Go to Home */}
            <Link to="/vicar-dashboard">
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center">
                <Home className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="text-xl font-semibold">Go to Home</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Return to the main homepage.
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VicarDashboard;
