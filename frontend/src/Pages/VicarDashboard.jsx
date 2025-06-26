import React from "react";
import { Link } from "react-router-dom";
import { FileText, FileSearch, Home } from "lucide-react";

const VicarDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Vicar Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Petitions */}
          <Link to="/view/hi">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all">
              <FileText className="w-10 h-10 text-blue-600 mb-2" />
              <h3 className="text-lg font-semibold">View Petitions</h3>
              <p className="text-gray-600">Check and review submitted petitions.</p>
            </div>
          </Link>

          {/* Reports */}
          <Link to="/balance-sheet">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all">
              <FileSearch className="w-10 h-10 text-green-600 mb-2" />
              <h3 className="text-lg font-semibold">View Reports</h3>
              <p className="text-gray-600">Access financial and community reports.</p>
            </div>
          </Link>

          {/* Home */}
          <Link to="/">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all">
              <Home className="w-10 h-10 text-yellow-600 mb-2" />
              <h3 className="text-lg font-semibold">Go to Home</h3>
              <p className="text-gray-600">Return to the main homepage.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VicarDashboard;
