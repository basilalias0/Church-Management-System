import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Settings = () => {
  const userId = "65fc2a1d123456789abcd"; // Replace with dynamic user ID
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`https://nexus-bt1n.onrender.com/api/user/${userId}`, values);
        alert("Settings updated successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error updating settings:", error);
        alert("Failed to update settings.");
      }
    },
  });

  // ✅ Fetch user data on mount
  useEffect(() => {
    axios.get(`https://nexus-bt1n.onrender.com/api/user/${userId}`)
      .then((response) => {
        formik.setValues({
          username: response.data.username,
          email: response.data.email,
          password: "", // Don't populate password for security reasons
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Account Settings
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              <label htmlFor="username" className="font-medium">Username:</label>
              <input
                type="text"
                id="username"
                className="border border-gray-300 p-3 rounded-lg w-2/3"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="flex justify-between">
              <label htmlFor="email" className="font-medium">Email:</label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 p-3 rounded-lg w-2/3"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="flex justify-between">
              <label htmlFor="password" className="font-medium">Password:</label>
              <input
                type="password"
                id="password"
                className="border border-gray-300 p-3 rounded-lg w-2/3"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
