//import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddRoom from "./pages/AddRoom"; // Adjust path as needed
import ViewAllRooms from "./pages/ViewAllRooms";
import UserDashboard from "./pages/UserDashboard";
import SearchClassrooms from "./pages/SearchClassrooms";
import ViewAvailability from "./pages/ViewAvailability";
// import BookClassroom from "./pages/BookClassroom";
import ManageBookings from "./pages/ManageBookings";
import AdminBookings from "./pages/AdminBookings";
// import Profile from "./pages/Profile";
// import UpdateProfile from "./pages/UpdateProfile";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route
  path="/addroom"
  element={
    <ProtectedRoute>
      <AddRoom />
    </ProtectedRoute>
    
  }
/>
<Route
  path="/admin-booking"
  element={
    <ProtectedRoute>
      <AdminBookings />
    </ProtectedRoute>
    
  }
/>
 <Route path="/viewrooms" element={<ProtectedRoute><ViewAllRooms /></ProtectedRoute>} />
 <Route path="/user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
  <Route path="/search-classrooms" element={<ProtectedRoute><SearchClassrooms /></ProtectedRoute>} />
  <Route path="/view-availability" element={<ProtectedRoute><ViewAvailability /></ProtectedRoute>} />
  <Route path="/manage-bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />


    </Routes>
  );
}
