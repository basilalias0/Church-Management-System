import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Allfamily = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');

      // If no token, redirect to login
      if (!token) {
        setError('No token found. Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
        setLoading(false);
        return;
      }

      console.log('Session token:', token);

      const response = await axios.get(`/api/users${search ? `?search=${search}` : ''}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Response Data:', response.data);

      setUsers(response.data);
      setError(null); // Clear error if successful
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error.response?.data?.message || error.message);
      setError('There was an issue fetching the users. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Registered Users</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-2 mb-4 rounded w-full max-w-sm"
      />

      {error && <p className="text-red-600 mb-2">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Parish Verified</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {user.isParishMember ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p>No users found.</p>
      )}
    </div>
  );
};

export default Allfamily;
