import React from "react";
import img1 from "../assets/img1.jpg"; // logo
import img2 from "../assets/img2.png"; // steps illustration
import { Link } from "react-router-dom";

import {
  FaPen,
  FaUpload,
  FaChartBar,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaUserFriends,
  FaMobileAlt,
  FaShieldAlt,
  FaCheckCircle,
  FaGlobe,
  FaRocket,
  FaBriefcase,
  FaClipboardCheck,
  FaGraduationCap,
  FaDollarSign,
} from "react-icons/fa";

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow-sm fixed-top"
        style={{ backgroundColor: "#28a745" }}
      >
        <div className="container">
          <a
            className="navbar-brand fw-bold d-flex align-items-center text-white"
            href="#"
          >
            <img
              src={img1}
              alt="Logo"
              width="40"
              height="40"
              className="me-2 rounded-circle"
              style={{ objectFit: "cover" }}
            />
            Quizzy
          </a>

          <button
            className="navbar-toggler text-white border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fw-semibold gap-4">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Features
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Product
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/quiz">Quiz Maker</a></li>
                  <li><a className="dropdown-item" href="/lms">LMS</a></li>
                  <li><a className="dropdown-item" href="/live">Live Quizzes</a></li>
                  <li><a className="dropdown-item" href="/builder">Exam Builder</a></li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Use Cases
                </a>
                <ul className="dropdown-menu p-2 shadow">
                  <li>
                    <a className="dropdown-item d-flex align-items-center gap-2" href="#">
                      <FaBriefcase className="text-primary" /> Business
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center gap-2" href="#">
                      <FaUserFriends className="text-info" /> Recruitment
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center gap-2" href="#">
                      <FaClipboardCheck className="text-success" /> Onboarding
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center gap-2" href="#">
                      <FaGraduationCap className="text-success" /> Education
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className="dropdown-item d-flex align-items-center gap-2" href="#">
                      <FaDollarSign className="text-warning" /> Selling Courses
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="/pricing">Pricing</a>
              </li>
            </ul>

            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light px-4">Log In</Link>
              <Link to="/signup" className="btn btn-light px-4">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ paddingTop: "90px" }}>
        {/* Steps Section */}
        <div className="container my-5 text-center">
          <h2 className="mb-4 fw-bold">It’s Simple! Here’s How It Works</h2>
          <img
            src={img2}
            alt="Steps Illustration"
            className="img-fluid rounded shadow mb-5"
            style={{ maxWidth: "1000px", height: "450px", objectFit: "cover" }}
          />
          <div className="d-flex justify-content-center flex-wrap gap-4">
            {[{
              icon: <FaPen size={40} className="text-primary" />,
              title: "Create",
              desc: "Quickly create great looking tests with multiple question types.",
            },{
              icon: <FaUpload size={40} className="text-danger" />,
              title: "Publish",
              desc: "Publish tests privately or open them up for everyone.",
            },{
              icon: <FaChartBar size={40} className="text-success" />,
              title: "Analyze",
              desc: "Instantly mark and generate reports for deep analysis.",
            }].map((step, idx)=>(
              <div key={idx} className="feature-box p-4 border rounded shadow-sm text-center">
                {step.icon}<h5 className="mt-2">{step.title}</h5>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="container my-5 text-center">
          <h2 className="mb-4 fw-bold">Powerful Features for Smarter Quizzes</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaUserFriends size={35} className="mb-3 text-info" />
                <h6>Collaboration</h6>
                <p>Create quizzes with your team in real-time and share easily.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaMobileAlt size={35} className="mb-3 text-primary" />
                <h6>Mobile Friendly</h6>
                <p>Optimized for all devices, so users can take quizzes anywhere.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaShieldAlt size={35} className="mb-3 text-danger" />
                <h6>Secure</h6>
                <p>Protect your data with enterprise-grade security and privacy.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Quizzy */}
        <div className="container my-5 text-center">
          <h2 className="mb-4 fw-bold">Why Choose Quizzy?</h2>
          <div className="row g-4 justify-content-center">
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaCheckCircle size={40} className="mb-3 text-success" />
                <h6>Easy to Use</h6>
                <p>Simple interface for creating and taking quizzes hassle-free.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaGlobe size={40} className="mb-3 text-primary" />
                <h6>Global Reach</h6>
                <p>Share quizzes worldwide and connect with learners everywhere.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100 feature-box">
                <FaRocket size={40} className="mb-3 text-danger" />
                <h6>Fast & Reliable</h6>
                <p>Get instant results with reliable performance for all exams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full Width */}
      <footer
        className="text-white py-5 mt-5"
        style={{ backgroundColor: "#003366", width: "100vw", left: 0 }}
      >
        <div className="container-fluid text-center">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">Quizzy</h5>
              <p>Your smart quiz platform.</p>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Quick Links</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Features</a></li>
                <li><a href="/pricing" className="text-light text-decoration-none">Pricing</a></li>
                <li><a href="/blog" className="text-light text-decoration-none">Blogs</a></li>
                <li><a href="/helpguide" className="text-light text-decoration-none">Help Guides</a></li>
                <li><a href="/contact" className="text-light text-decoration-none">Contact Us</a></li>
                <li><a href="/quiz" className="text-light text-decoration-none">Quiz Maker</a></li>
                <li><a href="/lms" className="text-light text-decoration-none">LMS</a></li>
              </ul>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="fw-bold">Follow Us</h6>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-white"><FaLinkedin size={24} /></a>
                <a href="#" className="text-white"><FaTwitter size={24} /></a>
                <a href="#" className="text-white"><FaFacebook size={24} /></a>
              </div>
            </div>
          </div>
          <hr className="border-light" />
          <p className="text-center small mb-0">
            © {new Date().getFullYear()} Quizzy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .feature-box {
          background: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-box:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default Home;
