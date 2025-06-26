import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    
    // Dummy Reset Logic (Replace with API call)
    alert("Password reset link has been sent to your email.");
    navigate("/admin-login"); // Redirect back to login page
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/public/church8.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Reset Card */}
      <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white">Reset Password</h2>
        <p className="text-center text-white/80 mb-6">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-white/90">Email Address</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-white/70">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border border-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/20 text-white placeholder-white/70"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-4 text-center text-white/80">
          Remember your password?{" "}
          <span 
            className="text-blue-300 hover:underline cursor-pointer"
            onClick={() => navigate("/admin-login")}
          >
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
