import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../Redux/UserSlice";
import { useState } from "react";
import { adminloginAPI } from "../Services/AdminService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState("");

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: adminloginAPI,
    mutationKey: ["AdminLogin"],
    onError: (error) => {
      const message= error?.response?.data?.message || "Login failed. Try again.";
      setApiError(message)
    },
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const { getFieldProps, errors, touched, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setApiError(""); // Clear previous errors
      try {
       
        const data = await mutateAsync(values);
        dispatch(login(data.token));
        sessionStorage.setItem("userToken",data.token);
        navigate("/admin-dashboard");
      } catch (err) {
        console.error("Login error:", err);
      }
    },
  });

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/church8.jpeg')" }} // Fixing background path
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>
        <p className="text-center text-white/80 mb-6">Sign in to access the admin panel</p>
        
        {isError && <p className="text-red-500 text-center mb-4">{error?.response.data.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg text-white/90">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-white/40 rounded-lg bg-white/20 text-white placeholder-white/70"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-lg text-white/90">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-white/40 rounded-lg bg-white/20 text-white placeholder-white/70"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {isPending && <div className="text-white text-center">Logging in...</div>}

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
