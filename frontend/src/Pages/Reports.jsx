import React, { useState, useRef } from "react";
import ViewIncome from "./ViewIncome";
import ViewExpense from "./ViewExpense";
import ViewBalanceSheet from "./ViewBalanceSheet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Reports = () => {
  const [activeReport, setActiveReport] = useState(null);
  const reportRef = useRef();

  const reports = [
    {
      id: 1,
      title: "Expense Report",
      date: "2024-01-01",
      file: "/reports/expense-report.pdf",
      component: <ViewExpense isEmbedded={true} />,
    },
    {
      id: 2,
      title: "Income Report",
      date: "2024-02-10",
      file: "/reports/income-report.pdf",
      component: <ViewIncome isEmbedded={true} />,
    },
    {
      id: 3,
      title: "Balance Sheet",
      date: "2024-03-15",
      file: "/reports/balance-sheet.pdf",
      component: <ViewBalanceSheet isEmbedded={true} />,
    },
  ];

  const selected = reports.find((r) => r.id === activeReport);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = 190;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 20, pdfWidth, pdfHeight);
    pdf.save(`${selected.title.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl bg-white shadow-xl rounded-xl p-8">
        {!activeReport ? (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
              Church Reports
            </h1>
            <p className="text-center text-gray-600 mb-8">
              View and download our latest reports detailing church activities and finances.
            </p>

            <ul className="space-y-6">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="p-6 bg-gray-50 shadow-md rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800">{report.title}</h2>
                      <p className="text-gray-600">Published on: {report.date}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setActiveReport(report.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      {/* <a
                        href={report.file}
                        download
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Download
                      </a> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setActiveReport(null)}
              className="absolute top-0 right-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Back
            </button>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
              {selected.title}
            </h2>

            {/* Report content wrapper */}
            <div
              ref={reportRef}
              className="bg-white border border-gray-300 rounded-xl p-6 shadow-inner mt-10"
            >
              {selected.component}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
