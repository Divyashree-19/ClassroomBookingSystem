import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";


const ViewAvailability = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookingData] = useState({});
  const [showForm, setShowForm] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch rooms");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookClick = (roomId) => {
    setShowForm(showForm === roomId ? null : roomId);
    setBookingData({
      roomId,
      date: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Booking failed");

      alert("Booking successful!");
      setShowForm(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="user-dashboard">
        <div className="sidebar">
                    <h2>Menu</h2>
                    <ul>
                        <li><Link to="/user">Home</Link></li>
        
                      <li><Link to="/search-classrooms">Search Classrooms</Link></li>
                      <li><Link to="/view-availability">View Rooms and Book</Link></li>
                      <li><Link to="/manage-bookings">Manage My Bookings</Link></li>
                      <li><Link to="/profile">Profile</Link></li>
                      <li><Link to="/update-profile">Update Profile</Link></li>
                    </ul>
                  </div>
    <div className="content" style={{ padding: "20px", color: "white" }}>
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room._id} style={{ marginBottom: "20px" }}>
              <strong>{room.name}</strong> — Capacity: {room.capacity}
              <br />
              <button onClick={() => handleBookClick(room._id)}>
                {showForm === room._id ? "Cancel" : "Book"}
              </button>

              {showForm === room._id && (
                <form onSubmit={handleBookingSubmit} style={{ marginTop: "10px" }}>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="startTime"
                    value={bookingData.startTime}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={bookingData.endTime}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit">Confirm Booking</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};


export default ViewAvailability;
