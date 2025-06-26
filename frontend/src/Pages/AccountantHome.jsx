import React from "react";
import {
  FaBalanceScale,
  FaChartLine,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaDonate,
  FaClipboardList,
} from "react-icons/fa";

const AccountantHome = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url("/acc.webp")` }} // ✅ Corrected path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="relative container mx-auto py-12 px-6">
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl font-extrabold">Accountant Dashboard</h1>
          <p className="text-lg mt-3 max-w-3xl mx-auto">
            Manage church finances effectively, track income and expenses, 
            and generate detailed financial reports with ease.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/90 p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition"
            >
              <div className="flex items-center space-x-4">
                <item.icon className="text-green-600 text-5xl" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <a 
                  href={item.link} 
                  className="text-green-700 font-medium hover:underline"
                >
                  {item.linkText} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const dashboardItems = [
  {
    title: "Balance Sheet",
    description: "View financial summaries and manage statements.",
    link: "/balance-sheet",
    linkText: "View Details",
    icon: FaBalanceScale,
  },
  {
    title: "Expense Management",
    description: "Track and optimize expenses for financial control.",
    link: "/expense-management",
    linkText: "Manage Expenses",
    icon: FaFileInvoiceDollar,
  },
  {
    title: "Financial Reports",
    description: "Generate reports for insights and decision-making.",
    link: "/financial-reports",
    linkText: "Generate Reports",
    icon: FaChartLine,
  },
  {
    title: "Income Management",
    description: "Track and manage church income sources.",
    link: "/income-management",
    linkText: "Track Income",
    icon: FaMoneyBillWave,
  },
  {
    title: "Donation Tracking",
    description: "Monitor and analyze church donations.",
    link: "/donation-tracking",
    linkText: "View Donations",
    icon: FaDonate,
  },
  {
    title: "Budget Planning",
    description: "Plan and allocate budgets efficiently.",
    link: "/budget-planning",
    linkText: "Plan Budget",
    icon: FaClipboardList,
  },
];

export default AccountantHome;
