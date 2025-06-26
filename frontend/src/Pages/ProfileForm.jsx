import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecodeData, getuserToken } from "../Utiles/storageHandler";
import { BASE_URL } from "../Utiles/Url";

const ProfileForm = () => {
  const token = getuserToken();
  const decoded = getDecodeData(); // contains user ID and role
  const navigate = useNavigate();

  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState(null); // Image file
  const [preview, setPreview] = useState(null); // For preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dateOfBirth", dob);
    formData.append("contactNumber", contact);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await fetch(`${BASE_URL}/users/profile/${decoded.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Profile update failed.");
        return;
      }

      alert("Profile updated successfully!");
      navigate("/virtualid");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Complete Your Profile
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-full w-24 h-24 object-cover mx-auto border-2 border-blue-400"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
