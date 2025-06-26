import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaMoneyBillWave, FaFileInvoiceDollar, FaBalanceScale } from "react-icons/fa";
import { deleteTransactionAPI, getTransactionsAPI } from "../Services/transactionService";

const BalanceSheet = () => {
  const queryClient = useQueryClient();

  // Fetch all transactions
  const { data: transactions = [], isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
  });

  // Delete transaction mutation
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

  // Process transactions data
  const incomeTransactions = transactions.filter(t => t.type === "income");
  const expenseTransactions = transactions.filter(t => t.type === "expense");
  
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  // Group transactions by category
  const revenueSources = Array.from(new Set(incomeTransactions.map(t => t.category)))
    .map(category => ({
      name: category,
      amount: incomeTransactions.filter(t => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0)
    }));

  const expenseBreakdown = Array.from(new Set(expenseTransactions.map(t => t.category)))
    .map(category => ({
      name: category,
      amount: expenseTransactions.filter(t => t.category === category)
        .reduce((sum, t) => sum + t.amount, 0)
    }));

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-green-900 text-center mb-8">Balance Sheet</h1>

        {isLoading ? (
          <p className="text-center text-gray-700">Loading balance sheet data...</p>
        ) : isError ? (
          <p className="text-center text-red-600">Error loading financial data</p>
        ) : (
          <>
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                icon={<FaMoneyBillWave className="text-green-600 text-4xl" />}
                title="Total Income"
                amount={totalIncome}
                color="green"
              />
              <Card
                icon={<FaFileInvoiceDollar className="text-red-600 text-4xl" />}
                title="Total Expenses"
                amount={totalExpenses}
                color="red"
              />
              <Card
                icon={<FaBalanceScale className="text-blue-600 text-4xl" />}
                title="Net Balance"
                amount={netBalance}
                color={netBalance >= 0 ? "green" : "red"}
              />
            </div>

            {/* Revenue & Expense Breakdown */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailCard title="Revenue Sources" data={revenueSources} color="green" />
              <DetailCard title="Expense Breakdown" data={expenseBreakdown} color="red" />
            </div>

            {/* Detailed Transactions List */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction Details</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left">Date</th>
                    <th className="border border-gray-300 p-3 text-left">Description</th>
                    <th className="border border-gray-300 p-3 text-left">Category</th>
                    <th className="border border-gray-300 p-3 text-right">Amount ($)</th>
                    <th className="border border-gray-300 p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <tr key={transaction._id} className="border-b border-gray-300">
                        <td className="p-3">
                          {new Date(transaction.transactionDate).toLocaleDateString()}
                        </td>
                        <td className="p-3">{transaction.description}</td>
                        <td className={`p-3 font-bold ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.category}
                        </td>
                        <td className={`p-3 text-right font-bold ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => deleteTransaction.mutate(transaction._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete transaction"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-3 text-center text-gray-500 italic">
                        No transactions available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Reusable Card Component (Keep existing implementation)
const Card = ({ icon, title, amount, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md border-l-8 border-${color}-500`}>
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className={`text-${color}-600 text-2xl font-bold`}>${amount.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

// Reusable Detail List Component (Keep existing implementation)
const DetailCard = ({ title, data, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
    <ul className="space-y-2">
      {data.length > 0 ? (
        data.map((item, index) => (
          <li key={index} className="flex justify-between border-b pb-2">
            <span className="text-gray-700">{item.name}</span>
            <span className={`text-${color}-600 font-bold`}>${item.amount.toLocaleString()}</span>
          </li>
        ))
      ) : (
        <p className="text-gray-500 italic">No data available</p>
      )}
    </ul>
  </div>
);

export default BalanceSheet;