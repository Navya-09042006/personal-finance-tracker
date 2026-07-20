import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ transactions }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const incomeData = months.map((month, index) => {
    return transactions
      .filter(
        (item) =>
          item.type === "income" && new Date(item.date).getMonth() === index,
      )
      .reduce((total, item) => total + item.amount, 0);
  });

  const expenseData = months.map((month, index) => {
    return transactions
      .filter(
        (item) =>
          item.type === "expense" && new Date(item.date).getMonth() === index,
      )
      .reduce((total, item) => total + item.amount, 0);
  });

  const data = {
    labels: months,

    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "green",
      },

      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div style={{ width: "600px" }}>
      <h3>Monthly Overview</h3>

      <Bar data={data} />
    </div>
  );
}

export default BarChart;
