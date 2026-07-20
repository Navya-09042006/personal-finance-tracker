import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditTransaction() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: "",
  });

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
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

      const transaction = response.data.find((item) => item._id === id);

      setFormData({
        title: transaction.title,

        amount: transaction.amount,

        type: transaction.type,

        category: transaction.category,

        date: transaction.date.substring(0, 10),
      });
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

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/transactions/${id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Transaction Updated Successfully");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Edit Transaction</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <br />
        <br />

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
        />

        <br />
        <br />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Income</option>

          <option value="expense">Expense</option>
        </select>

        <br />
        <br />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <br />
        <br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Update Transaction</button>
      </form>
    </div>
  );
}

export default EditTransaction;
