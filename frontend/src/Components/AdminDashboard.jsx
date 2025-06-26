import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { logout } from "../Redux/UserSlice";
import { getDecodeData } from "../Utiles/storageHandler";
import { getBloodDonorsAPI } from "../Services/bloodDonarService";

import AdminReports from "../Pages/AdminReports";
import ViewPetitions from "../Pages/ViewPetitions";
import FamilyUnitForm from "../Pages/FamilyUnitForm";
import FamilyUnitView from "../Pages/FamilyUnitView";
import FamilyMemberView from "../Pages/FamilyMemberView"; // ✅ Newly imported
import ImageGalleryUpload from "../Pages/ImageGalleryUpload";
import VerifyUsers from "../Pages/VerifyUsers";
import ParishList from "../Pages/ParishList";
import ViewEvents from "../Pages/ViewEvents";
import DonatorsList from "../Pages/DonatorsList";
import ViewExpense from "../Pages/ViewExpense";
import ViewIncome from "../Pages/ViewIncome";
import ViewBalanceSheet from "../Pages/ViewBalanceSheet";
import QuizForms from "../Pages/QuizForms"; // ✅ Newly imported

const AdminDashboard = () => {
  const [userDropdown, setUserDropdown] = useState(false);
  const [reportsDropdown, setReportsDropdown] = useState(false);

  const [showReports, setShowReports] = useState(false);
  const [showPetitions, setShowPetitions] = useState(false);
  const [showFamilyUnit, setShowFamilyUnit] = useState(false);
  const [showFamilyUnitView, setShowFamilyUnitView] = useState(false);
  const [showFamilyMemberView, setShowFamilyMemberView] = useState(false); // ✅ New state
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showBloodDonors, setShowBloodDonors] = useState(false);
  const [showVerifyUsers, setShowVerifyUsers] = useState(false);
  const [showViewEvents, setShowViewEvents] = useState(false);
  const [showParishList, setShowParishList] = useState(false);
  const [showDonatorsList, setShowDonatorsList] = useState(false);
  const [showViewExpense, setShowViewExpense] = useState(false);
  const [showViewIncome, setShowViewIncome] = useState(false);
  const [showViewBalanceSheet, setShowViewBalanceSheet] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false); // ✅ New state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const { data: donors, isLoading, isError, error } = useQuery({
    queryFn: getBloodDonorsAPI,
    queryKey: ["view-blood-donors"],
  });

  const decodedUser = getDecodeData();

  const resetViews = () => {
    setShowReports(false);
    setShowPetitions(false);
    setShowFamilyUnit(false);
    setShowFamilyUnitView(false);
    setShowFamilyMemberView(false); // ✅ Reset new page
    setShowImageGallery(false);
    setShowBloodDonors(false);
    setShowVerifyUsers(false);
    setShowViewEvents(false);
    setShowParishList(false);
    setShowDonatorsList(false);
    setShowViewExpense(false);
    setShowViewIncome(false);
    setShowViewBalanceSheet(false);
    setShowQuizForm(false); // ✅ Reset new page
  };

  useEffect(() => {
    if (location.pathname === "/parish-list") {
      resetViews();
      setShowParishList(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
          <h2 className="text-xl font-bold text-center py-4">Church Admin</h2>
          <nav className="space-y-2">
            <Link className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded" to="/admin-dashboard">
              🏠 <span>Dashboard</span>
            </Link>

            <div>
              <button onClick={() => setUserDropdown(!userDropdown)} className="flex justify-between w-full p-3 hover:bg-gray-700 rounded">
                <span className="flex items-center space-x-3">👥 <span>User Management</span></span> ▼
              </button>
              {userDropdown && (
                <div className="ml-5 space-y-2">
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowVerifyUsers(true); }}>All Users</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowBloodDonors(true); }}>Blood Donors</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowFamilyUnit(true); }}>Add Family Unit</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowFamilyUnitView(true); }}>View Family Unit</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowFamilyMemberView(true); }}>View Family Members</button> {/* ✅ New button */}
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowParishList(true); }}>Parish List</button>
                </div>
              )}
            </div>

            <div>
              <button onClick={() => setReportsDropdown(!reportsDropdown)} className="flex justify-between w-full p-3 hover:bg-gray-700 rounded">
                <span className="flex items-center space-x-3">📄 <span>Reports</span></span> ▼
              </button>
              {reportsDropdown && (
                <div className="ml-5 space-y-2">
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowReports(true); }}>View Reports</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowPetitions(true); }}>View Petitions</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowViewEvents(true); }}>View Events</button>
                  <button className="block p-2 w-full text-left hover:bg-gray-700 rounded" onClick={() => { resetViews(); setShowQuizForm(true); }}>Create Quiz Form</button>
                </div>
              )}
            </div>

            <button className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded w-full text-left" onClick={() => { resetViews(); setShowImageGallery(true); }}>
              🖼️ <span>Image Upload Gallery</span>
            </button>

            <button className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded w-full text-left" onClick={() => { resetViews(); setShowDonatorsList(true); }}>
              💝 <span>Donators List</span>
            </button>
          </nav>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
            <div className="flex space-x-4 items-center">
              <input type="text" placeholder="🔍 Search..." className="pl-4 pr-4 py-2 border rounded-lg focus:outline-none" />
              🔔 👤
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                🚪 Logout
              </button>
            </div>
          </div>

          <div className="p-6 flex-1">
            {showParishList && <ParishList />}
            {!showParishList && (
              <>
                {showReports && <AdminReports setShowViewExpense={setShowViewExpense} setShowViewIncome={setShowViewIncome} setShowViewBalanceSheet={setShowViewBalanceSheet} />}
                {showPetitions && <ViewPetitions />}
                {showFamilyUnit && <FamilyUnitForm />}
                {showFamilyUnitView && <FamilyUnitView />}
                {showFamilyMemberView && <FamilyMemberView />} {/* ✅ Render Family Member View */}
                {showImageGallery && <ImageGalleryUpload />}
                {showVerifyUsers && <VerifyUsers />}
                {showViewEvents && <ViewEvents />}
                {showDonatorsList && <DonatorsList />}
                {showQuizForm && <QuizForms />}
                {showViewExpense && (<><button onClick={() => { resetViews(); setShowReports(true); }} className="text-blue-600 underline mb-4">← Back to Reports</button><ViewExpense /></>)}
                {showViewIncome && (<><button onClick={() => { resetViews(); setShowReports(true); }} className="text-blue-600 underline mb-4">← Back to Reports</button><ViewIncome /></>)}
                {showViewBalanceSheet && (<><button onClick={() => { resetViews(); setShowReports(true); }} className="text-blue-600 underline mb-4">← Back to Reports</button><ViewBalanceSheet /></>)}
                {showBloodDonors && (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-red-300 mt-6">
    <h2 className="text-2xl font-bold text-red-500 mb-4">Blood Donors List</h2>
    {isLoading && <p className="text-center text-gray-600">Loading donors...</p>}
    {isError && <p className="text-center text-red-500">{error.message}</p>}
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-red-500 text-white">
        <tr>
          <th className="p-3 border border-gray-300">Name</th>
          <th className="p-3 border border-gray-300">Blood Type</th>
          <th className="p-3 border border-gray-300">Contact</th>
        </tr>
      </thead>
      <tbody>
        {donors?.map((donor) => (
          <tr key={donor.id} className="text-center">
            <td className="p-3 border border-gray-300">{donor.name}</td>
            <td className="p-3 border border-gray-300 text-red-600 font-bold">{donor.bloodType}</td>
            {/* Corrected this line to use donor.contactNumber */}
            <td className="p-3 border border-gray-300">{donor.contactNumber}</td> {/* Assuming contactNumber is the correct field */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
