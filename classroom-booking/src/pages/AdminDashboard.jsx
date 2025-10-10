import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.subtext}>Manage classrooms, resources, and more</p>

      <div style={styles.buttonContainer}>
        <Link to="/addroom" style={styles.link}>
          <button style={styles.button}>➕ Add New Room</button>
        </Link>

        <Link to="/viewrooms" style={styles.link}>
          <button style={styles.button}>📋 View All Rooms</button>
        </Link>

        <Link to="/admin-booking" style={styles.link}>
          <button style={styles.button}>🗓 Manage Bookings</button>
        </Link>

        <button style={{ ...styles.button, backgroundColor: "#ff4d4d" }} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

// Simple inline styling
const styles = {
  container: {
    padding: "40px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
    background: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#333"
  },
  subtext: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "30px"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center"
  },
  link: {
    textDecoration: "none",
    width: "100%"
  },
  button: {
    width: "200px",
    padding: "12px 20px",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "#fff",
    transition: "background 0.3s ease"
  }
};

export default AdminDashboard;
