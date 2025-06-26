import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice"; // Adjust path based on your project

const AccountantNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userToken"); // Remove authentication token
    navigate("/");

  };

  return (
    <nav className="bg-green-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-400">
          Nexus Church - Accountant
        </div>
        <ul className="flex space-x-6">
          <li><Link to="/accountant-home" className="hover:text-yellow-400 transition">Accountant Home</Link></li>
          <li><Link to="/balance-sheet" className="hover:text-yellow-400 transition">Balance Sheet</Link></li>
          <li><Link to="/financial-reports" className="hover:text-yellow-400 transition">Financial Reports</Link></li>
          <li><Link to="/expense-management" className="hover:text-yellow-400 transition">Expense Management</Link></li>
          <li><Link to="/income-statements" className="hover:text-yellow-400 transition">Income Statements</Link></li>
          <li><Link to="/donation-tracking" className="hover:text-yellow-400 transition">Donation Tracking</Link></li>
          <li><Link to="/budget-planning" className="hover:text-yellow-400 transition">Budget Planning</Link></li>
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-yellow-400 transition bg-transparent border-none text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AccountantNavbar;
