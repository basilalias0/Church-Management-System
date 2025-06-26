import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getuserToken, getDecodeData } from '../Utiles/storageHandler';

const BASE_URL = "https://nexus-bt1n.onrender.com/api/v1";

// API to add blood donor
const addBloodDonorAPI = async (data) => {
    const token = getuserToken();
    if (!token) throw new Error("Unauthorized: No token found");

    const response = await axios.post(`${BASE_URL}/blood-donor`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

// API to fetch user profile
const fetchUserProfile = async (userId, token) => {
    const response = await axios.get(`${BASE_URL}/users/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

const BloodDonationPage = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const token = getuserToken();
    const decoded = getDecodeData();

    const [initialContact, setInitialContact] = useState('');

    // Fetch user's contact number when component mounts
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile(decoded.id, token);
                if (data?.contactNumber) {
                    setInitialContact(data.contactNumber);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        loadProfile();
    }, [decoded.id, token]);

    const mutation = useMutation({
        mutationFn: addBloodDonorAPI,
        onSuccess: () => {
            queryClient.invalidateQueries('blood-donors');
            navigate('/view-blooddonation');
        },
        onError: (error) => {
            console.error("Submission error:", error);
        }
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            bloodType: '',
            contactNumber: initialContact
        },
        validationSchema: Yup.object({
            bloodType: Yup.string().required('Blood type is required'),
            contactNumber: Yup.string()
                .matches(/^[0-9]+$/, 'Must be a valid number')
                .min(10, 'Must be at least 10 digits')
                .required('Contact number is required')
        }),
        onSubmit: (values, { resetForm }) => {
            mutation.mutate(values, {
                onSuccess: () => resetForm(),
            });
        }
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('/blood-donation.jpg')" }}>
            <div className="max-w-md w-full bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl border border-red-500">
                <h2 className="text-3xl font-extrabold text-center text-red-500 mb-6">Register as a Blood Donor</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Blood Type</label>
                        <select
                            name="bloodType"
                            value={formik.values.bloodType}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Blood Type</option>
                            <option value="A Positive">A Positive</option>
                            <option value="A Negative">A Negative</option>
                            <option value="B Positive">B Positive</option>
                            <option value="B Negative">B Negative</option>
                            <option value="O Positive">O Positive</option>
                            <option value="O Negative">O Negative</option>
                            <option value="AB Positive">AB Positive</option>
                            <option value="AB Negative">AB Negative</option>
                        </select>
                        {formik.touched.bloodType && formik.errors.bloodType ? (
                            <div className="text-red-500 text-sm">{formik.errors.bloodType}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formik.values.contactNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                        />
                        {formik.touched.contactNumber && formik.errors.contactNumber ? (
                            <div className="text-red-500 text-sm">{formik.errors.contactNumber}</div>
                        ) : null}
                    </div>

                    {mutation.isError && (
                        <div className="text-red-600 text-center">
                            Error: {mutation.error?.message || 'Something went wrong'}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-red-600 focus:ring-4 focus:ring-red-400"
                    >
                        {mutation.isLoading ? 'Submitting...' : 'Register as Donor'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BloodDonationPage;
