import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactionAPI, getTransactionsAPI, deleteTransactionAPI } from "../Services/transactionService";

const ExpenseManagement = () => {
  const queryClient = useQueryClient();

  // Fetch transactions
  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
  });

  // Mutation for creating transaction
  const createTransaction = useMutation({
    mutationFn: createTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("✅ Transaction added successfully!");
    },
    onError: (error) => {
      alert(error.message || "❌ Failed to add transaction");
    },
  });

  // Mutation for deleting transaction
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("✅ Transaction deleted successfully!");
    },
    onError: (error) => {
      alert(error.message || "❌ Failed to delete transaction");
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      transactionDate: "",
      category: "",
      amount: "",
      description: "",
      type: "expense",
    },
    validationSchema: Yup.object({
      transactionDate: Yup.date().required("Transaction date is required"),
      category: Yup.string().required("Category is required"),
      amount: Yup.number()
        .typeError("Amount must be a number")
        .min(1, "Amount must be greater than zero")
        .required("Amount is required"),
      description: Yup.string().required("Description is required"),
      type: Yup.string().oneOf(["income", "expense"]).required("Type is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      createTransaction.mutate(
        { ...values, amount: Number(values.amount) },
        {
          onSuccess: () => resetForm(),
        }
      );
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center drop-shadow-md">
        Expense Management
      </h1>

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Date</label>
            <input
              type="date"
              name="transactionDate"
              value={formik.values.transactionDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
            {formik.touched.transactionDate && formik.errors.transactionDate && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.transactionDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Others">Others</option>
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input
              type="number"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Amount ($)"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Description"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
            )}
          </div>

          <input type="hidden" name="type" value={formik.values.type} />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={createTransaction.isLoading}
              className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {createTransaction.isLoading ? "Adding..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>

      {/* Expense List Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Expense List</h2>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading expenses...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load expenses</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses found.</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="flex justify-between items-center border-b py-3 hover:bg-gray-100 transition rounded-md px-2"
              >
                <span className="text-gray-700 font-medium">
                  {expense.category} -{" "}
                  <span className="text-green-600">${expense.amount}</span> (
                  {new Date(expense.transactionDate).toLocaleDateString()})
                </span>
                <button
                  onClick={() => deleteTransaction.mutate(expense._id)}
                  className="px-4 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={deleteTransaction.isLoading}
                >
                  {deleteTransaction.isLoading ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseManagement;