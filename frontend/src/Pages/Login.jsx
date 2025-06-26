import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../Redux/UserSlice";
import { loginAPI } from "../Services/UserService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync, isPending,isError,error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["UserLogin"],
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
        if (!data || !data.token) {
          throw new Error("Invalid login response: Token missing");
        }

        // Store token and user info
        dispatch(login(data.token));
       sessionStorage.setItem("userToken", data.token);
       sessionStorage.setItem("userInfo", JSON.stringify(data.user)); 

        navigate("/user-home");
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-yellow-400 mb-6">
          Login to Nexus Church
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              {...getFieldProps("email")}
            />
            {touched.email && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              {...getFieldProps("password")}
            />
            {touched.password && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Loading and Error Messages */}
          {isPending && <div className="text-blue-500">Logging in...</div>}
          {isError && <div className="text-red-500">{error?.response?.data?.message || "Login failed"}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 mt-4"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?
          <Link to="/signup" className="text-yellow-400 hover:text-yellow-500 font-semibold"> Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
