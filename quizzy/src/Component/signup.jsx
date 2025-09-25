import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../assets/img1.jpg"; // Replace with your logo path

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:8081/api"; // Spring Boot backend URL

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      let errorMsg = "";

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.message || JSON.stringify(errorData);
        } else {
          errorMsg = await response.text();
        }
        alert("Signup failed: " + errorMsg);
        console.error("Signup failed:", response.status, errorMsg);
      }
    } catch (err) {
      console.error("Network/Server Error:", err);
      alert("⚠️ Unable to connect to server. Check if backend is running.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        className="card shadow p-4 text-center"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <img
          src={img1}
          alt="Quizzy Logo"
          className="mx-auto mb-3"
          style={{ width: "80px", height: "80px", objectFit: "contain" }}
        />

        <h2 className="mb-4">Create your free account</h2>

        <form onSubmit={handleSignup}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-primary">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label fw-bold text-success">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Continue
          </button>
        </form>

        <p className="text-muted small mt-3">
          By creating a login or selecting to skip sign up you agree to our{" "}
          <a href="#" className="text-decoration-underline text-primary">
            terms and conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-decoration-underline text-primary">
            privacy policy
          </a>.
        </p>
      </div>
    </div>
  );
}
