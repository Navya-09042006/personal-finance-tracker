import React, { useEffect, useState } from "react";
import axios from "axios";

import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import Navbar from "../components/Navbar";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(transactions.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Welcome {user?.name} 👋</h2>

        <button onClick={() => (window.location.href = "/add-transaction")}>
          Add Transaction
        </button>

        <h2>Your Transactions</h2>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>

              <th>Category</th>

              <th>Type</th>

              <th>Amount</th>

              <th>Date</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>{item.type}</td>

                <td>₹ {item.amount}</td>

                <td>{new Date(item.date).toLocaleDateString()}</td>

                <td>
                  <button
                    onClick={() =>
                      (window.location.href = `/edit-transaction/${item._id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTransaction(item._id)}
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "40px" }}>
          <PieChart transactions={transactions} />
        </div>

        <div style={{ marginTop: "40px" }}>
          <BarChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
