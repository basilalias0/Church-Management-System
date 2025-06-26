import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTransactionsAPI } from "../Services/transactionService";

const FinancialReports = () => {
  // Enhanced query with error handling
  const { 
    data: transactions = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      try {
        const data = await getTransactionsAPI();
        console.log("API Response Data:", data); // Debug log
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        return data;
      } catch (err) {
        console.error("API Error:", err);
        throw err;
      }
    },
    retry: 2
  });

  // Date range state
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  // Process transactions with fallback to empty array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  
  const categorizeTransaction = (t) => {
    // Customize this based on your business logic
    return t.category === 'Investment' ? 'income' : 'expense';
  };

  const processedTransactions = safeTransactions.map(t => ({
    ...t,
    type: categorizeTransaction(t)
  }));

  const filteredTransactions = processedTransactions.filter(t => {
    try {
      const transDate = new Date(t.transactionDate);
      return transDate >= new Date(dateRange.start) && 
             transDate <= new Date(dateRange.end);
    } catch {
      return false;
    }
  });

  // Calculate financial data
  const incomeTransactions = filteredTransactions.filter(t => t.type === "income");
  const expenseTransactions = filteredTransactions.filter(t => t.type === "expense");
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const netBalance = totalIncome - totalExpenses;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Loading financial data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0 text-red-500">✕</div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
              <p className="text-sm text-red-700 mt-2">
                {error?.message || "Failed to fetch transactions"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sample Data (Demo Only)</h2>
          <p className="text-gray-600 mb-4">
            While we resolve the API issue, here's sample data:
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">2023-06-01</td>
                <td className="border p-2">Sample Income</td>
                <td className="border p-2 text-green-600">+$1,000</td>
              </tr>
              <tr>
                <td className="border p-2">2023-06-02</td>
                <td className="border p-2">Sample Expense</td>
                <td className="border p-2 text-red-600">-$500</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty state
  if (safeTransactions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0 text-blue-500">ℹ️</div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">No transactions found</h3>
              <p className="text-sm text-blue-700 mt-2">
                Try adjusting your date range or add new transactions
              </p>
            </div>
          </div>
        </div>
        
        {/* Date filter and empty state UI */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              />
            </div>
          </div>
          
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No transactions</h3>
            <p className="mt-1 text-gray-500">
              Get started by adding new income or expense transactions.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Financial Reports</h1>
      
      {/* Date Range Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-medium text-green-800 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">
            ${totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-800 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">
            ${totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className={`p-6 rounded-lg border ${
          netBalance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'
        }`}>
          <h3 className="text-lg font-medium mb-2">Net Balance</h3>
          <p className={`text-3xl font-bold ${
            netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'
          }`}>
            ${netBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(transaction => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No transactions found in selected date range
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;