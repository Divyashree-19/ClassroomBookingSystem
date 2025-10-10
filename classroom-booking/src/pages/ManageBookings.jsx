import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/bookings/mybookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to cancel booking");
      setBookings(bookings.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading your bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
  <div className="user-dashboard">
    <div className="sidebar">
                <h2>Menu</h2>
                <ul>
                    <li><Link to="/user">Home</Link></li>
    
                  <li><Link to="/search-classrooms">Search Classrooms</Link></li>
                  <li><Link to="/view-availability">Rooms and Book</Link></li>
                  <li><Link to="/manage-bookings">Manage My Bookings</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/update-profile">Update Profile</Link></li>
                </ul>
              </div>
    <div className="content" style={{ padding: "20px", color: "white" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse",border:"2px solid black" }}>
          <thead>
            <tr style={{ background: "transparent", color: "white" }}>
              <th style={cellStyle}>Room</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Start Time</th>
              <th style={cellStyle}>End Time</th>
              <th style={cellStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} style={{ background: "transparent" }}>
                <td style={cellStyle}>{booking.room?.name || "N/A"}</td>
                <td style={cellStyle}>{new Date(booking.date).toLocaleDateString()}</td>
                <td style={cellStyle}>{booking.startTime}</td>
                <td style={cellStyle}>{booking.endTime}</td>
                <td style={cellStyle}>
                  <button
                    style={{
                      padding: "5px 10px",
                      background: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

const cellStyle = {
  border: "1px solid #080808ff",
  padding: "8px",
  textAlign: "center",
};

export default ManageBookings;
