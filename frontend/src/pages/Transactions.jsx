import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Transactions.css";

function Transactions() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/transactions/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        alert("Transaction Updated Successfully!");
      } else {
        await axios.post("http://localhost:5000/api/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Transaction Added Successfully!");
      }

      setFormData({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });

      setEditId(null);
      fetchTransactions();
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  const editTransaction = (transaction) => {
    setEditId(transaction._id);

    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date.substring(0, 10),
    });
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Transaction Deleted Successfully!");

      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="transactions-container">
        <div className="form-card">
          <h2>{editId ? "Update Transaction" : "Add Transaction"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <button className="submit-btn" type="submit">
              {editId ? "Update Transaction" : "Add Transaction"}
            </button>
          </form>
        </div>

        <div className="table-card">
          <h2>My Transactions</h2>

          {transactions.length === 0 ? (
            <p>No Transactions Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction.title}</td>

                    <td>₹ {transaction.amount}</td>

                    <td>{transaction.type}</td>

                    <td>{transaction.category}</td>

                    <td>{new Date(transaction.date).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => editTransaction(transaction)}
                      >
                        Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTransaction(transaction._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
