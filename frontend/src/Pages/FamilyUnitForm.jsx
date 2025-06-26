import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFamilyUnitAPI } from "../Services/familyUnitService";

const FamilyUnitForm = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createFamilyUnitAPI,
        onSuccess: () => {
            alert("✅ Family Unit added successfully!");
            queryClient.invalidateQueries(["family-units"]);
        },
        onError: (error) => {
            alert(error.response?.data?.message || "❌ Failed to create Family Unit");
        }
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            shortCode: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Family Unit Name is required"),
            shortCode: Yup.string().required("Family Unit Code is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            mutation.mutate(values, {
                onSuccess: () => {
                    resetForm();
                }
            });
        },
    });

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border">
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">🏡 Add Family Unit</h2>

            {mutation.isError && (
                <p className="text-center text-red-600">❌ {mutation.error.message}</p>
            )}
            {mutation.isSuccess && (
                <p className="text-center text-green-600">✅ Family Unit added successfully!</p>
            )}

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
                    {mutation.isLoading ? "Saving..." : "🚀 Save Family Unit"}
                </button>
            </form>
        </div>
    );
};

export default FamilyUnitForm;
