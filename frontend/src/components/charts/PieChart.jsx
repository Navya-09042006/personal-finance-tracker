import React from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ transactions }) {
  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const data = {
    labels: ["Income", "Expense"],

    datasets: [
      {
        data: [income, expense],

        backgroundColor: ["green", "red"],
      },
    ],
  };

  return (
    <div style={{ width: "350px" }}>
      <h3>Income vs Expense</h3>

      <Pie data={data} />
    </div>
  );
}

export default PieChart;
