import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getDecodeData } from '../Utiles/storageHandler';
import { getBloodDonorsAPI } from '../Services/bloodDonarService';

const ViewBloodDonationPage = () => {
    const { data: donors, isLoading, isError, error } = useQuery({
        queryFn: getBloodDonorsAPI,
        queryKey: ['view-blood-donors']
    });

    const decodedUser = getDecodeData(); // Get logged-in user data
    const userEmail = decodedUser?.email || "Not Available"; // Extract email

    // Show only logged-in users who are blood donors
    const loggedUsersDonors = donors?.filter(donor => donor.email) || [];

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 relative">
            
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            <div className="max-w-3xl w-full bg-white bg-opacity-95 p-8 rounded-2xl shadow-xl border border-red-500 relative z-10">
                
                {/* Display Logged-in User Email */}
                <p className="text-center text-sm text-gray-700 mb-4 font-medium">
                    Logged in as: <strong className="text-red-600">{userEmail}</strong>
                </p>

                <h2 className="text-3xl font-bold text-center text-red-500 mb-6 uppercase tracking-wide">
                    Blood Donors (All Logged-in Users)
                </h2>

                {isLoading && <p className="text-center text-gray-500">Loading donors...</p>}
                {isError && <p className="text-center text-red-500">{error.message}</p>}

                {loggedUsersDonors.length === 0 ? (
                    <p className="text-center text-gray-600">No registered donors found.</p>
                ) : (
                    <ul className="space-y-6">
                        {loggedUsersDonors.map((donor) => (
                            <li key={donor.id} className="p-4 bg-gray-50 border-l-4 border-red-500 shadow-md rounded-lg">
                                <p className="text-lg font-semibold text-gray-800">
                                    <strong>Name:</strong> {donor.name}
                                </p>
                                <p className="text-md font-semibold text-gray-800">
                                    <strong>Blood Type:</strong> {donor.bloodType}
                                </p>
                                <p className="text-md text-gray-700">
                                    <strong>Contact:</strong> {donor.contactNumber}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <strong>Donor Email:</strong> {donor.email}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewBloodDonationPage;
