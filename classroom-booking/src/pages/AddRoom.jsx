import React, { useState } from "react";
import axios from "axios";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [resources, setResources] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rooms",
        {
          name,
          capacity: Number(capacity),
          location,
          resources: resources.split(",").map((r) => r.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setMessage(`Room added: ${res.data.name}`);
      setName("");
      setCapacity("");
      setLocation("");
      setResources("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add room");
    }
  };

  return (
    <div>
      <h2>Add New Room</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Resources (comma separated)"
          value={resources}
          onChange={(e) => setResources(e.target.value)}
          required
        />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;
