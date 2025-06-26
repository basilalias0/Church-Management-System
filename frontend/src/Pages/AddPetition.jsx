import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPetitionAPI } from '../Services/PetitionService';

const AddPetition = () => {
    const queryClient = useQueryClient();
    const [successMessage, setSuccessMessage] = useState('');

    const mutation = useMutation({
        mutationFn: createPetitionAPI,
        onSuccess: () => {
            queryClient.invalidateQueries('view-my-petition');
            setSuccessMessage('Your petition has been submitted successfully!');
        }
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required')
        }),
        onSubmit: (values, { resetForm }) => {
            mutation.mutateAsync(values).then(() => {
                resetForm();
            });
        }
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('/petition.jpg')" }}>
            <div className="max-w-md w-full bg-white bg-opacity-90 p-10 rounded-2xl shadow-xl border border-yellow-500">
                <h2 className="text-3xl font-extrabold text-center text-yellow-500 mb-6">Submit a Petition</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="text-red-500 text-sm">{formik.errors.title}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-sm">{formik.errors.description}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400">
                        {mutation.isLoading ? 'Submitting...' : 'Submit Petition'}
                    </button>
                </form>

                {successMessage && (
                    <div className="mt-6 text-green-600 font-medium text-center">
                        ✅ {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPetition;
