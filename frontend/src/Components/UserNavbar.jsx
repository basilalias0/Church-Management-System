import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";
import { Bell, ChevronDown } from "lucide-react";
import "../App.css";
import { getUserNotificationsAPI, MarkAllAsReadAPI, markAsReadAPI } from "../Services/notificationService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState({ parish: false, member: false, service: false });
  const queryClient = useQueryClient()

  const markAllAsRead = useMutation({
    mutationFn:MarkAllAsReadAPI,
    mutationKey:['mark-all-as-read']
  })

  const markAsRead = useMutation({
    mutationFn:markAsReadAPI,
    mutationKey:['mark-as-read']
  })

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userToken");
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleMenu = (menu) => {
    setMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const {data:notifications, isLoading:notificationLoading} = useQuery({
    queryKey:['notification'],
    queryFn:getUserNotificationsAPI
  })
  
  const handleMarkAllAsRead = ()=>{
    markAllAsRead.mutateAsync().then((data)=>{
      queryClient.invalidateQueries(['notification'])
    })
  }
  const handleMarkAsRead = (id)=>{
    markAsRead.mutateAsync(id).then((data)=>{
      queryClient.invalidateQueries(['notification'])
    })
  }
  

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-yellow-400">Nexus Church</div>
        <ul className="flex space-x-6 items-center relative">
          {/* Dashboard */}
          <li>
            <Link to="/user-home" className="hover:text-yellow-400">
              Dashboard
            </Link>
          </li>

          {/* Parish Dropdown */}
          <li className="relative">
            <button onClick={() => toggleMenu("parish")} className="hover:text-yellow-400 flex items-center gap-1">
              Parish <ChevronDown size={16} />
            </button>
            {menuOpen.parish && (
              <div className="absolute bg-white text-black mt-2 w-48 rounded shadow-lg z-50">
                <Link to="/parish-directory" className="block px-4 py-2 hover:bg-gray-100">Parish Directory</Link>
                <Link to="/quiz-form" className="block px-4 py-2 hover:bg-gray-100">View Quiz Form</Link>
                <Link to="/add" className="block px-4 py-2 hover:bg-gray-100">Petition</Link>
                <Link to="/reports" className="block px-4 py-2 hover:bg-gray-100">Reports</Link>
              </div>
            )}
          </li>

          {/* Member Dropdown */}
          <li className="relative">
            <button onClick={() => toggleMenu("member")} className="hover:text-yellow-400 flex items-center gap-1">
              Member <ChevronDown size={16} />
            </button>
            {menuOpen.member && (
              <div className="absolute bg-white text-black mt-2 w-56 rounded shadow-lg z-50">
                <Link to="/profile-form" className="block px-4 py-2 hover:bg-gray-100">Update Profile</Link>
                <Link to="/virtualid" className="block px-4 py-2 hover:bg-gray-100">ID cards</Link>
                {/* <Link to="/add-familyunit" className="block px-4 py-2 hover:bg-gray-100">Add Family Unit</Link> */}
                <Link to="/donators-list" className="block px-4 py-2 hover:bg-gray-100">Donators List</Link>
              </div>
            )}
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button onClick={() => toggleMenu("service")} className="hover:text-yellow-400 flex items-center gap-1">
              Services <ChevronDown size={16} />
            </button>
            {menuOpen.service && (
              <div className="absolute bg-white text-black mt-2 w-60 rounded shadow-lg z-50">
                <Link to="/view-events" className="block px-4 py-2 hover:bg-gray-100">Events</Link>
                <Link to="/Donation2" className="block px-4 py-2 hover:bg-gray-100">Donation</Link>
                <Link to="/blood-donation" className="block px-4 py-2 hover:bg-gray-100">Blood Donation Form</Link>
                <Link to="/view-blooddonation" className="block px-4 py-2 hover:bg-gray-100">View Blood Donation</Link>
              </div>
            )}
          </li>

          {/* Notification Bell */}
          <li className="relative">
            <button onClick={toggleDropdown} className="relative hover:text-yellow-400">
              <Bell size={20} />
              {notifications?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-black rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                <div className="p-3 font-semibold border-b border-gray-300 bg-gray-100 rounded-t-lg">
                  Notifications
                </div>
                {notifications?.length > 0 ? (
  <>
    <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex justify-end items-center">
      {notifications?.some((notif) => !notif.isRead) && (
        <button
          onClick={() => handleMarkAllAsRead()}
          className="text-sm text-blue-600 hover:underline focus:outline-none"
        >
          Mark all as read
        </button>
      )}
    </div>
    {notifications?.map((notif, index) => (
      <div
        key={index}
        className={`px-4 py-3 border-b border-gray-200 text-sm hover:bg-gray-100 transition duration-200 ${
          notif.isRead ? 'bg-white' : 'bg-blue-50' // Example: Slightly highlight unread
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-800 font-bold">{notif.title}</p>
            <p className="text-gray-800">{notif.message}</p>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(notif.createdAt).toLocaleString()}
            </div>
          </div>
          {!notif.isRead && (
            <button
              onClick={() => handleMarkAsRead(notif._id)}
              className="text-xs text-blue-600 hover:underline focus:outline-none"
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    ))}
  </>
) : notificationLoading ? (
  <div className="p-4 text-gray-500 text-sm text-center">Notification Loading...</div>
) : (
  <div className="p-4 text-gray-500 text-sm text-center">No notifications found.</div>
)}
              </div>
            )}
          </li>

          {/* Logout */}
          <li>
            <button onClick={handleLogout} className="hover:text-yellow-400">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
