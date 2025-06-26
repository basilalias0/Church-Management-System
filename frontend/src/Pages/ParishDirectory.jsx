import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getDecodeData } from "../Utiles/storageHandler";
import { familyService } from "../Services/familyService";
import { useNavigate } from "react-router-dom";

const ParishDirectory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    occupation: "",
    contactNumber: "",
    dateOfBirth: "",
    familyUnitCode: "",
    uniqueFamilyCode: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // Mutation for adding a family member
  const addFamilyMemberMutation = useMutation({
    mutationFn: familyService.addFamilyMember,
    onSuccess: () => {
      setSuccess("Family member added successfully!");
      setFormData({
        name: "",
        relation: "",
        occupation: "",
        contactNumber: "",
        dateOfBirth: "",
        familyUnitCode: "",
        uniqueFamilyCode: "",
      });
      setError("");
    },
    onError: (error) => {
      setError(
        error.response?.data?.message || error.message || "Failed to add family member."
      );
      setSuccess("");
    },
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const userData = getDecodeData();
    addFamilyMemberMutation.mutate(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-6">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Add Family Member
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-center mb-4" role="status">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "name",
            "relation",
            "occupation",
            "contactNumber",
            "dateOfBirth",
            "familyUnitCode",
            "uniqueFamilyCode",
          ].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-semibold">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field === "dateOfBirth" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required={
                  field === "name" ||
                  field === "relation" ||
                  field === "familyUnitCode" ||
                  field === "uniqueFamilyCode"
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={addFamilyMemberMutation.isLoading}
          >
            {addFamilyMemberMutation.isLoading ? "Submitting..." : "Add Member"}
          </button>
        </form>

        {/* Parish List Button below form */}
        <button
          onClick={() => navigate("/parish-list")}
          className="mt-4 w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Go to Parish List
        </button>
      </div>
    </div>
  );
};

export default ParishDirectory;
