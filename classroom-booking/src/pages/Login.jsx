import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) { alert("Fill both fields"); return; }
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      // role-based redirect
      console.log(res.data.user.role)
      if (res.data.user.role === "admin"){
       

        navigate("/admin");
      }
      
      else if (res.data.user.role === "student" || res.data.user.role === "faculty" ||res.data.user.role==="user") navigate("/user");

      else navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.log(err.response?.data?.message)
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <h2>Login</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
        <p>New? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
}
