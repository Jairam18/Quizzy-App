import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg"; // replace with your logo

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE = "http://localhost:8081/api"; // Spring Boot backend

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        alert(`✅ Login Successful! Welcome, ${user.email}`);
        navigate("/"); // Redirect to Home page
      } else {
        const error = await response.text();
        alert("❌ Login failed: " + error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{ background: "linear-gradient(135deg, #e8f4fc, #cce0ff)" }}
    >
      <div
        className="card p-5 shadow-lg"
        style={{ borderRadius: "15px", width: "400px" }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img src={img1} alt="Logo" width="80" height="80" />
        </div>

        <h5 className="text-center mb-4">Log in to Quizzy</h5>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>

        {/* Signup link */}
        <div className="text-center mt-3">
          Don’t have an account?{" "}
          <a href="/signup" className="text-primary">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
