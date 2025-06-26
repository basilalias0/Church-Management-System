import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../Services/UserService";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const mutation = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["signup-user"],
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(null); // Reset error message before submission
      try {
        await mutation.mutateAsync(values);
      } catch (error) {
        console.error("Registration Error:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-yellow-400 mb-6">
          Create Your Account
        </h2>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <InputField
            label="Full Name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            formik={formik}
          />

          {/* Email Field */}
          <InputField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            formik={formik}
          />

          {/* Phone Number Field */}
          <InputField
            label="Phone Number"
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            formik={formik}
          />

          {/* Password Field */}
          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            formik={formik}
          />

          {/* Confirm Password Field */}
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            formik={formik}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full p-3 mt-4 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
          >
            {mutation.isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?
          <Link to="/login" className="text-yellow-400 hover:text-yellow-500 font-semibold">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

/**
 * Reusable InputField Component
 */
const InputField = ({ label, type, name, placeholder, formik }) => (
  <div>
    <label htmlFor={name} className="block text-lg text-gray-600">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
    )}
  </div>
);

export default SignUp;
