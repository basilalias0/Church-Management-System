import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../Utiles/Url";

const fetchDonations = async () => {
  const res = await axios.get(`${BASE_URL}/donation`); // Adjust if your route is different
  return res.data;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

const DonationChart = () => {
  const { data: donations = [], isLoading, isError, error } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchDonations,
  });

  // Group by donor name and sum their donations
  const chartData = donations.reduce((acc, donation) => {
    const existing = acc.find((item) => item.name === donation.name);
    if (existing) {
      existing.value += donation.amount;
    } else {
      acc.push({ name: donation.name, value: donation.amount });
    }
    return acc;
  }, []);

  if (isLoading) return <p className="text-center">Loading donations...</p>;
  if (isError) return <p className="text-center text-red-600">{error.message}</p>;
  if (chartData.length === 0) return <p className="text-center">No donation data available.</p>;

  return (
    <div className="w-full h-[500px] p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-center mb-4">Donation Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;
