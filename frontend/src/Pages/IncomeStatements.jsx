import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactionAPI, getTransactionsAPI, deleteTransactionAPI } from "../Services/transactionService";

const IncomeStatements = () => {
  const queryClient = useQueryClient();

  // Fetch transactions and filter for income
  const { data: incomes = [], isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
    select: (data) => data.filter((transaction) => transaction.type === "income"), // Filter for income only
  });

  // Mutation for creating income transaction
  const createTransaction = useMutation({
    mutationFn: createTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("✅ Income added successfully!");
    },
    onError: (error) => {
      alert(error.message || "❌ Failed to add income");
    },
  });

  // Mutation for deleting income transaction
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      alert("✅ Income deleted successfully!");
    },
    onError: (error) => {
      alert(error.message || "❌ Failed to delete income");
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      transactionDate: "",
      category: "",
      amount: "",
      description: "",
      type: "income", // Default to "income" for this page
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
        { ...values, amount: Number(values.amount), type: "income" }, // Ensure type is "income"
        {
          onSuccess: () => resetForm(),
        }
      );
    },
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-md">
        Income Statements
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {createTransaction.isLoading ? "Adding..." : "Add Income"}
            </button>
          </div>
        </form>
      </div>

      {/* Income List Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Income List</h2>

        {isLoading ? (
          <p className="text-gray-500 text-center">Loading incomes...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load incomes</p>
        ) : incomes.length === 0 ? (
          <p className="text-gray-500 text-center">No incomes found.</p>
        ) : (
          <ul className="space-y-4">
            {incomes.map((income) => (
              <li
                key={income._id}
                className="flex justify-between items-center border-b py-3 hover:bg-gray-100 transition rounded-md px-2"
              >
                <span className="text-gray-700 font-medium">
                  {income.category} -{" "}
                  <span className="text-blue-600">${income.amount}</span> (
                  {new Date(income.transactionDate).toLocaleDateString()})
                </span>
                <button
                  onClick={() => deleteTransaction.mutate(income._id)}
                  className="px-4 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export default IncomeStatements;