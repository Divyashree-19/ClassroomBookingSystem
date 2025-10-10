import React from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="user-dashboard">
         <div className="sidebar">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/search-classrooms">Search Classrooms</Link></li>
          <li><Link to="/view-availability">View Rooms and Book</Link></li>
          <li><Link to="/manage-bookings">Manage My Bookings</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/update-profile">Update Profile</Link></li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to User Dashboard</h1>
        <p>Select an option from the right menu.</p>
      </div>
     
    </div>
  );
}
