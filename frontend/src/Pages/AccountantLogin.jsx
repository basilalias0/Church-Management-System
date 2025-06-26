import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { FaUser, FaLock } from "react-icons/fa";
import { accountantLoginAPI } from "../Services/AccountantService";
import { login } from "../Redux/UserSlice";

const AccountantLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: accountantLoginAPI,
    mutationKey: ["AccountantLogin"],
    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed. Try again.";
      setApiError(message);
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
      try {
        const data = await mutateAsync(values);

        if (data.role !== "Accountant") {
          throw new Error("Unauthorized: Only accountants can log in.");
        }

        dispatch(login(data.token));
        sessionStorage.setItem("userToken",data.token);
        navigate("/accountant-home");
      } catch (err) {
        console.error("Login failed", err);
      }
    },
  });

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/church3.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative bg-white/15 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/40">
        <h2 className="text-4xl font-extrabold text-center text-white mb-2">Accountant Login</h2>
        <p className="text-center text-white/80 mb-6">Sign in to manage finances</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-white/90">Email Address</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-white/70">
                <FaUser />
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/25 text-white placeholder-white/60 shadow-sm"
                placeholder="Enter your email"
                {...getFieldProps("email")}
              />
              {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-white/90">Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-white/70">
                <FaLock />
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/25 text-white placeholder-white/60 shadow-sm"
                placeholder="Enter your password"
                {...getFieldProps("password")}
              />
              {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>
          {isPending && <div className="text-white text-center">Loading...</div>}
          {isError && <div className="text-red-500 text-center">{error?.response?.data?.message || "Login failed"}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-2 text-center text-white/80">
          Don't have an account? {" "}
          <span
            className="text-blue-300 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default AccountantLogin;
