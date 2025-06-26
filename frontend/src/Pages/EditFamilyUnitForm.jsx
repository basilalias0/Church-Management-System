import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getFamilyUnitByIdAPI,
    updateFamilyUnitAPI,
} from "../Services/familyUnitService";

const EditFamilyUnitForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["family-unit", id],
        queryFn: () => getFamilyUnitByIdAPI(id),
    });

    const mutation = useMutation({
        mutationFn: (updatedData) => updateFamilyUnitAPI(id, updatedData),
        onSuccess: () => {
            alert("✅ Family Unit updated successfully!");
            queryClient.invalidateQueries(["family-units"]);
            navigate("/admin/family-units"); // Go back to list
        },
        onError: (error) => {
            alert(error.response?.data?.message || "❌ Failed to update Family Unit");
        }
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            shortCode: "",
        },
        enableReinitialize: true, // Allow form to populate once data loads
        validationSchema: Yup.object({
            name: Yup.string().required("Family Unit Name is required"),
            shortCode: Yup.string().required("Family Unit Code is required"),
        }),
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    if (isLoading) {
        return <p className="text-center text-lg text-gray-600 animate-pulse">⏳ Loading Family Unit...</p>;
    }

    if (isError) {
        return <p className="text-center text-lg text-red-600 font-semibold">❌ Failed to load Family Unit</p>;
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">✏️ Edit Family Unit</h2>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Family Unit Name</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-sm">{formik.errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-medium text-gray-700">Family Unit Code</label>
                    <input
                        type="text"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                        {...formik.getFieldProps("shortCode")}
                    />
                    {formik.touched.shortCode && formik.errors.shortCode && (
                        <p className="text-red-500 text-sm">{formik.errors.shortCode}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Saving..." : "💾 Update Family Unit"}
                </button>
            </form>
        </div>
    );
};

export default EditFamilyUnitForm;
