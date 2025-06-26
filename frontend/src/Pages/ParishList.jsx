import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaArrowLeft } from "react-icons/fa";
import { familyService } from "../Services/familyService";

// Utility function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

// Group members by creator name using native JS
const groupByCreator = (members) => {
  return members.reduce((acc, member) => {
    const key = member.creatorId?.name || "Unknown Creator";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(member);
    return acc;
  }, {});
};

const ParishList = () => {
  const navigate = useNavigate();

  // Fetch all family members using useQuery
  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["familyMembers"],
    queryFn: familyService.getAllFamilyMembers,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Loading family members...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500" role="alert">
          {error.message || "Failed to load family members."}
        </p>
      </div>
    );
  }

  const groupedMembers = groupByCreator(members);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Family Members List (Grouped by Creator)
        </h2>

        {Object.entries(groupedMembers).map(([creatorName, group]) => (
          <div key={creatorName} className="mb-10">
            <h3 className="text-xl font-bold text-purple-700 mb-4">
              {creatorName}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3">Name</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">Relation</th>
                    <th className="p-3">Contact Number</th>
                    <th className="p-3">Family Unit Code</th>
                    <th className="p-3">Creator</th>
                  </tr>
                </thead>
                <tbody>
                  {group.map((member) => (
                    <tr key={member._id} className="border-b">
                      <td className="p-3">{member.name}</td>
                      <td className="p-3">{calculateAge(member.dateOfBirth)}</td>
                      <td className="p-3">{member.relation}</td>
                      <td className="p-3">{member.contactNumber || "N/A"}</td>
                      <td className="p-3">{member.familyUnitCode}</td>
                      <td className="p-3">{member.creatorId?.name || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/parish-directory")}
            className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Parish Directory
          </button>

          {/* <button
            onClick={() => navigate("/virtualid")}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <FaUsers /> Youth Members
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ParishList;
