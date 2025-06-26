import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

const ReceiptPage = () => {
  const { transactionId } = useParams();
  const [receipt, setReceipt] = useState(null);
  const printRef = useRef(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/donation/receipt/${transactionId}`);
        setReceipt(res.data);
      } catch (err) {
        console.error("Failed to fetch receipt:", err);
        alert("Receipt not found.");
      }
    };

    fetchReceipt();
  }, [transactionId]);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Donation Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt-container {
              max-width: 600px;
              margin: auto;
              border: 1px solid #ccc;
              padding: 20px;
              border-radius: 10px;
            }
            h2 { text-align: center; }
            .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #555; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            ${content}
            <div class="footer">Thank you for your generous donation!</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  if (!receipt) return <div className="p-8 text-center">Loading receipt...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div ref={printRef} className="bg-white max-w-xl mx-auto p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Donation Receipt</h2>
        <p><strong>Receipt ID:</strong> {transactionId}</p>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Phone:</strong> {receipt.contactNumber}</p>
        <p><strong>Amount:</strong> ₹{receipt.amount}</p>
        {receipt.message && <p><strong>Message:</strong> {receipt.message}</p>}
        <p><strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
