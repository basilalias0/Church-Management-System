import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1"; // Your API base URL

const DonationTracking = () => {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/donation`);
        setDonations(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filteredDonations = donations.filter((donation) =>
    donation.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-6xl bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Donation Tracking</h1>

        {/* Search Bar */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by donor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Donation Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading donations...</p>
          ) : filteredDonations.length > 0 ? (
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Donor</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation, index) => (
                  <tr
                    key={donation._id}
                    className={`${index % 2 === 0 ? "bg-blue-50" : "bg-white"} border-b hover:bg-yellow-100 transition`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{donation.name}</td>
                    <td className="px-6 py-4 text-green-700 font-semibold">${donation.amount}</td>
                    <td className="px-6 py-4 text-gray-700">{donation.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No matching donations found.</p>
          )}
        </div>

        {/* Print Button */}
        {/* <div className="flex justify-center mt-8">
          <button
            onClick={handlePrint}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Print Donation Records
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DonationTracking;
