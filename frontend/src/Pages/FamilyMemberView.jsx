import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { familyService } from "../Services/familyService";
import { useNavigate } from "react-router-dom";

const FamilyMemberView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch family members
  const { data, isLoading, isError } = useQuery({
    queryKey: ["family-members"],
    queryFn: familyService.getAllFamilyMembers,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: familyService.deleteFamilyMember,
    onSuccess: () => {
      alert("✅ Family member deleted successfully!");
      queryClient.invalidateQueries(["family-members"]);
    },
    onError: (error) => {
      alert("❌ Failed to delete: " + error.message);
    },
  });

  // Handlers
  const handleEdit = (id) => {
    alert("✏️ Navigating to edit ID: " + id);
    navigate(`/edit-family-member/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this family member?")) {
      deleteMutation.mutate(id);
    }
  };

  // UI States
  if (isLoading) {
    return (
      <p className="text-center text-lg text-gray-600 animate-pulse">
        ⏳ Loading Family Members...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-lg text-red-600 font-semibold">
        ❌ Failed to load Family Members
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        👨‍👩‍👧‍👦 Parish Members
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-4 text-lg">#</th>
              <th className="border p-4 text-lg">Name</th>
              <th className="border p-4 text-lg">Relation</th>
              <th className="border p-4 text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((member, index) => (
              <tr
                key={member._id}
                className="text-center text-gray-700 bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-200"
              >
                <td className="border p-4 font-medium">{index + 1}</td>
                <td className="border p-4">{member.name}</td>
                <td className="border p-4">{member.relation}</td>
                <td className="border p-4 space-x-2">
                  {/* <button
                    onClick={() => handleEdit(member._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    ✏️ Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FamilyMemberView;
