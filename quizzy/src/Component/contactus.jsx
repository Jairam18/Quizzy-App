import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const API_BASE = "http://localhost:8081/api"; // Spring Boot backend URL

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Message submitted! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const error = await response.text();
        alert("❌ Submission failed: " + error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f6f8", padding: "20px" }}>
      <div style={{ backgroundColor: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", maxWidth: "600px", width: "100%" }}>
        <h2 className="mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><FaUser className="me-2" />Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><FaEnvelope className="me-2" />Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><FaPhone className="me-2" />Phone</label>
            <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label"><FaCommentDots className="me-2" />Message</label>
            <textarea name="message" className="form-control" value={formData.message} onChange={handleChange} rows="4" required></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
