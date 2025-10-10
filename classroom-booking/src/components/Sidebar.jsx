import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>User Menu</h2>
      <ul>
        <li><Link to="/search-classrooms">Search Classrooms</Link></li>
        <li><Link to="/view-availability">View Availability</Link></li>
        <li><Link to="/book-classroom">Book Classroom</Link></li>
        <li><Link to="/manage-bookings">Manage My Bookings</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/update-profile">Update Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
