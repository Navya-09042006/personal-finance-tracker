import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import EditTransaction from "./pages/EditTransaction";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/add-transaction" element={<AddTransaction />} />

      <Route path="/edit-transaction/:id" element={<EditTransaction />} />
    </Routes>
  );
}

export default App;
