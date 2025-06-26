import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/profile/${id}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            User Profile
          </h1>

          <div className="flex items-center justify-center mb-6">
            <img
              src={user?.profilePicture || "/person.jpeg"}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500 shadow-lg"
            />
          </div>

          <div className="space-y-4 text-left text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span className="font-light">{user?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span className="font-light">{user?.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span className="font-light">{user?.role}</span>
            </div>

            {user?.address && (
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span className="font-light">{user?.address}</span>
              </div>
            )}

            {user?.contactNumber && (
              <div className="flex justify-between">
                <span className="font-medium">Contact:</span>
                <span className="font-light">{user?.contactNumber}</span>
              </div>
            )}

            {user?.bloodType && (
              <div className="flex justify-between">
                <span className="font-medium">Blood Type:</span>
                <span className="font-light">{user?.bloodType}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="font-medium">Volunteer:</span>
              <span className="font-light">{user?.volunteer ? "Yes" : "No"}</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
