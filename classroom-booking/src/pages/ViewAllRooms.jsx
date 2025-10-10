import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  }, [token, navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>All Rooms</h1>
      {rooms.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Resources</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.capacity}</td>
                <td>{room.location}</td>
                <td>{room.resources?.join(", ")}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1800px",
    margin: "0 auto",
    backgroundColor: "#fdfdfbff",
    borderRadius: "8px"
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#070707ff"
  },
  noData: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#777"
  },
 table: {
    background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
    padding:"50px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
     width: "100%",
    borderCollapse: "separate", // not collapse
    borderSpacing: "15px", // horizontal and vertical gap
    fontSize: "1.1rem",
  },
  thead: {
    background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
    color: "white",
    padding:"50px"
  },
  th: {
    padding: "20px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "1rem",
    letterSpacing: "0.5px",
  },
  tbodyRow: {
    transition: "background 0.2s ease, transform 0.15s ease",
  },
  tbodyRowEven: {
    backgroundColor: "#f8f9fc",
  },
  tbodyRowHover: {
    backgroundColor: "#eef2ff",
    transform: "scale(1.01)",
  },
  td: {
    padding: "20px 20px",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "0.95rem",
    color: "#333",
  },
  firstTd: {
    fontWeight: 500,
  },
  tfoot: {
    backgroundColor: "#f1f1f1",
    fontWeight: "bold",
    color: "#444",
  },
  tfootTd: {
    padding: "12px",
    borderTop: "2px solid #ccc",
  },
};
export default ViewAllRooms;
