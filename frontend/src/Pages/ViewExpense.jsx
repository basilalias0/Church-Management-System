import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsAPI } from "../Services/transactionService";
import { Link } from "react-router-dom";

const ViewExpense = () => {
  // Fetch expenses
  const { data: expenses = [], isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
  });

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
        Expense List
      </h1>
     

      <div className="bg-white shadow-lg rounded-lg p-6">
        {isLoading ? (
          <p className="text-gray-500 text-center">Loading expenses...</p>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load expenses</p>
        ) : expenses.length === 0 ? (
          <p className="text-gray-500 text-center">No expenses found.</p>
        ) : (
          <ul className="space-y-4">
            {expenses
              .filter((item) => item.type === "expense")
              .map((expense) => (
                <li
                  key={expense._id}
                  className="flex justify-between items-center border-b py-3 hover:bg-gray-100 transition rounded-md px-2"
                >
                  <span className="text-gray-700 font-medium">
                    {expense.category} -{" "}
                    <span className="text-green-600">${expense.amount}</span>{" "}
                    ({new Date(expense.transactionDate).toLocaleDateString()})
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewExpense;
