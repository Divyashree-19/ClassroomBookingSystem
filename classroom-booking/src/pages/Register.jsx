import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // you wanted admin/user; default to admin for testing
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !role) { alert("Fill all fields"); return; }
    try {
      await api.post("/auth/register", { username, email, password, role });
      alert("Registered! Login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h2>Register</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Register</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
