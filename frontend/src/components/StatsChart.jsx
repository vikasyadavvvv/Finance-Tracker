import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaMoneyBillWave, FaPiggyBank, FaChartPie } from "react-icons/fa";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart({ transactions }) {
  // Calculate totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const saving = transactions
    .filter((t) => t.type === "saving")
    .reduce((acc, t) => acc + t.amount, 0);

  // Chart data
  const data = {
    labels: ["Income", "Expense", "Saving"],
    datasets: [
      {
        data: [income, expense, saving],
        backgroundColor: [
          "#10b981", // emerald-500
          "#f59e0b", // amber-500
          "#3b82f6", // blue-500 (for savings)
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
          },
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-emerald-800 flex items-center">
          <FaChartPie className="mr-2 text-amber-500" />
          Financial Overview
        </h2>
        <div className="flex items-center space-x-2 text-sm">
          <span className="flex items-center text-emerald-600">
            <GiReceiveMoney className="mr-1" /> ₹{income.toFixed(2)}
          </span>
          <span className="flex items-center text-amber-600">
            <GiPayMoney className="mr-1" /> ₹{expense.toFixed(2)}
          </span>
          <span className="flex items-center text-blue-600">
            <FaPiggyBank className="mr-1" /> ₹{saving.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="relative h-64 md:h-80 lg:h-96">
        <Doughnut data={data} options={options} />
      </div>

     <div className="mt-6 flex flex-col xs:flex-row flex-wrap gap-2 sm:gap-4">
  {/* Income Card */}
  <div className="flex-1 min-w-[150px] bg-emerald-50 p-2 sm:p-3 rounded-lg flex items-center">
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full mr-2"></div>
    <span className="font-medium text-sm sm:text-base">Income</span>
    <span className="ml-auto font-mono text-xs sm:text-sm">₹{income.toFixed(2)}</span>
  </div>

  {/* Expense Card */}
  <div className="flex-1 min-w-[150px] bg-amber-50 p-2 sm:p-3 rounded-lg flex items-center">
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full mr-2"></div>
    <span className="font-medium text-sm sm:text-base">Expense</span>
    <span className="ml-auto font-mono text-xs sm:text-sm">₹{expense.toFixed(2)}</span>
  </div>

  {/* Saving Card */}
  <div className="flex-1 min-w-[150px] bg-blue-50 p-2 sm:p-3 rounded-lg flex items-center">
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2"></div>
    <span className="font-medium text-sm sm:text-base">Saving</span>
    <span className="ml-auto font-mono text-xs sm:text-sm">₹{saving.toFixed(2)}</span>
  </div>
</div>
    </div>
  );
}