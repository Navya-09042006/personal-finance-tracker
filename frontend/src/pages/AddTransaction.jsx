import React, { useState } from "react";
import axios from "axios";

function AddTransaction() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/transactions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Transaction Added Successfully");

      setFormData({
        title: "",
        amount: "",
        type: "income",
        category: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error adding transaction");
    }
  };

  return (
    <div>
      <h1>Add Transaction</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
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
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
