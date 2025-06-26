import React, { useEffect, useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1"; // Replace with your backend URL

const DonatorsList = () => {
  const [donators, setDonators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonators = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/donation`);
        setDonators(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonators();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 flex justify-center items-center gap-2">
          <FaHandHoldingHeart className="text-yellow-600" /> Donators List
        </h1>
        <p className="text-center text-gray-600 mb-6">
          We appreciate the generosity of our donors who contribute to the church’s mission.
        </p>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading donors...</p>
          ) : (
            <table className="w-full bg-gray-50 border border-gray-200 shadow-md rounded-lg">
              <thead className="bg-yellow-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {donators.length > 0 ? (
                  donators.map((donator, index) => (
                    <tr
                      key={donator._id}
                      className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-yellow-100 transition`}
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">{donator.name}</td>
                      <td className="py-4 px-6 font-semibold text-green-700">${donator.amount}</td>
                      <td className="py-4 px-6 text-gray-600">
                        {donator.message || "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No donors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonatorsList;
