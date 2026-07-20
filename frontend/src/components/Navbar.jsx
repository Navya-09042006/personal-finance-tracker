import React from "react";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#222",
        color: "white",
        marginBottom: "30px",
      }}
    >
      <h2>Personal Finance Tracker</h2>

      <button
        onClick={logout}
        style={{
          padding: "8px 15px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
