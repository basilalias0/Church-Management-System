import React, { useState } from "react";
import BalanceSheet from "../Pages/BalanceSheet";
import ExpenseManagement from "../Pages/Expensemanagement";
import IncomeStatements from "../Pages/IncomeStatements";
import FinancialReports from "../Pages/FinancialReports";
import ViewExpense from "./ViewExpense";
import ViewIncome from "./ViewIncome";
import ViewBalanceSheet from "./ViewBalanceSheet";
import DonationChart from "./DonationChart";

const AdminReports = () => {
  const [showContent, setShowContent] = useState(null);

  const reports = [
    { id: 1, title: "piechart", date: "February 2025", details: "Total donations collected" },
    { id: 2, title: "Expense Reports", date: "March 2025", details: "Total expenses" },
    { id: 3, title: "Financial Reports", date: "January 2025", details: "Total financial" },
    { id: 4, title: "Balance Sheet Report", date: "Year 2024", details: "Total Income | Expenses | Savings" },
    { id: 5, title: "Income Reports", date: "March 2025", details: "Total income" },
  ];

  const handleShowContent = (contentType) => {
    setShowContent(contentType);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
            {showContent === "DonationChart" && <DonationChart />}

      {showContent === "BalanceSheet" && <ViewBalanceSheet />}
      {showContent === "ExpenseManagement" && <ViewExpense />}
      {showContent === "IncomeStatements" && <ViewIncome />}
      {showContent === "FinancialReports" && <FinancialReports />}
      
      {!showContent && (
        <>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📄 Admin Reports</h2>
          <p className="text-gray-600 mb-4">Here are the latest financial and event reports for review.</p>

          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-yellow-50"
              >
                <h3 className="text-xl font-semibold text-yellow-700">{report.title}</h3>
                <p className="text-gray-600">📅 {report.date}</p>
                <p className="text-gray-700 mt-2">{report.details}</p>
                {report.title === "Donation Chart" && (
                  <button
                    onClick={() => handleShowContent("DonationChart")}
                    className="mt-3 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Pie Chart
                  </button>
                )}

                {report.title === "Balance Sheet Report" && (
                  <button
                    onClick={() => handleShowContent("BalanceSheet")}
                    className="mt-3 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    View Balance Sheet
                  </button>
                )}

                {report.title === "Expense Reports" && (
                  <button
                    onClick={() => handleShowContent("ExpenseManagement")}
                    className="mt-3 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    View Expense Report
                  </button>
                )}

                {report.title === "Income Reports" && (
                  <button
                    onClick={() => handleShowContent("IncomeStatements")}
                    className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Income Report
                  </button>
                )}

                {report.title === "Financial Reports" && (
                  <button
                    onClick={() => handleShowContent("FinancialReports")}
                    className="mt-3 inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    View Financial Report
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminReports;
