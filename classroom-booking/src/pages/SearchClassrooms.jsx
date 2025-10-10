import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserDashboard.css";


export default function SearchClassrooms() {
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!name.trim()) {
      setError("Please enter a classroom name");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/search?name=${name}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (<div className="user-dashboard">
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
    <div className="content" style={{ padding: "50px" }}>
      <h2>Search Classroom</h2>
      <input
        type="text"
        placeholder="Enter room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Room Details</h3>
          <p><b>Name:</b> {result.room.name}</p>
          <p><b>Location:</b> {result.room.location}</p>
          <p><b>Capacity:</b> {result.room.capacity}</p>
          <p><b>Resources:</b> {result.room.resources.join(", ") || "None"}</p>

          <h4>Bookings</h4>
          {result.bookings.length === 0 ? (
            <p>Available - No bookings for today</p>
          ) : (
            <ul>
              {result.bookings.map((b) => (
                <li key={b._id}>
                  {new Date(b.date).toLocaleDateString()} - {b.startTime} to {b.endTime}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
    </div>
  );
}
