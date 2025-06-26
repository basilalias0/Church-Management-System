import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../Redux/UserSlice";
import { useState } from "react";
import { vicarLoginAPI } from "../Services/VicarService";

const VicarLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending,isError,error } = useMutation({
    mutationFn: vicarLoginAPI,
    mutationKey: ["VicarLogin"],
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
        const data = await mutateAsync(values);
        console.log("API Response:", data);
        dispatch(login(data.token));
        sessionStorage.setItem("userToken", data.token);
        navigate("/vicar-dashboard");
      
    },
  });
  console.log(error);
  

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/church6.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white">Vicar Login</h2>
        <p className="text-center text-white/80 mb-6">Sign in to access your dashboard</p>

        {isError && <p className="text-red-500 text-center mb-4">{error?.response.data.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg text-white/90">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-white/40 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg text-white/90">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-white/40 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-blue-400"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Loading State */}
          {isPending && <div className="text-white text-center">Logging in...</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Forgot password? <Link to="/reset-password" className="text-blue-300 hover:text-blue-400 font-semibold">Reset Here</Link>
        </p>
      </div>
    </div>
  );
};

export default VicarLogin;
