import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllFamilyUnitsAPI,
    deleteFamilyUnitAPI,
    updateFamilyUnitAPI
} from "../Services/familyUnitService";
import { toast } from "react-toastify";

const FamilyUnitView = () => {
    const queryClient = useQueryClient();
    const [editUnit, setEditUnit] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["family-units"],
        queryFn: getAllFamilyUnitsAPI
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteFamilyUnitAPI(id),
        onSuccess: () => {
            toast.success("Family Unit deleted successfully!");
            queryClient.invalidateQueries(["family-units"]);
        },
        onError: () => {
            toast.error("Failed to delete Family Unit.");
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, updatedData }) => updateFamilyUnitAPI(id, updatedData),
        onSuccess: () => {
            toast.success("Family Unit updated successfully!");
            setEditUnit(null);
            queryClient.invalidateQueries(["family-units"]);
        },
        onError: () => {
            toast.error("Failed to update Family Unit.");
        }
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Family Unit?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name: e.target.name.value,
            shortCode: e.target.shortCode.value
        };
        updateMutation.mutate({ id: editUnit._id, updatedData });
    };

    if (isLoading) {
        return <p className="text-center text-lg text-gray-600 animate-pulse">⏳ Loading Family Units...</p>;
    }

    if (isError) {
        return <p className="text-center text-lg text-red-600 font-semibold">❌ Failed to load Family Units</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-md rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">🏡 Family Units</h2>

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border p-4 text-lg">#</th>
                            <th className="border p-4 text-lg">Name</th>
                            <th className="border p-4 text-lg">Short Code</th>
                            <th className="border p-4 text-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((unit, index) => (
                            <tr
                                key={unit._id}
                                className="text-center text-gray-700 bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition duration-200"
                            >
                                <td className="border p-4 font-medium">{index + 1}</td>
                                <td className="border p-4">{unit.name}</td>
                                <td className="border p-4">{unit.shortCode}</td>
                                <td className="border p-4 space-x-2">
                                    <button
                                        onClick={() => setEditUnit(unit)}
                                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(unit._id)}
                                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editUnit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">✏️ Edit Family Unit</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 text-gray-700 font-semibold">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editUnit.name}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-gray-700 font-semibold">Short Code</label>
                                <input
                                    type="text"
                                    name="shortCode"
                                    defaultValue={editUnit.shortCode}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditUnit(null)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilyUnitView;
