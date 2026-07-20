import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      console.log(response.data);

      alert("Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>💰 Personal Finance Tracker</h1>

      <h2>Create Account</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name</label>

        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>

        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <div className="login-link">
        Already have an account? <Link to="/">Login Here</Link>
      </div>
    </div>
  );
}

export default Register;
