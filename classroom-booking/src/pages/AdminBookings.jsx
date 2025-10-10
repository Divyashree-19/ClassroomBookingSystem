import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Room</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Booked By</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.room}</td>
                <td>{b.date}</td>
                <td>{b.startTime}</td>
                <td>{b.endTime}</td>
                <td>{b.bookedBy}</td>
                <td>{b.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
