import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Component/home.jsx";
import Login from "./Component/login.jsx";
import Signup from "./Component/signup.jsx";
import Quiz from "./Component/quiz.jsx";
import Lms from "./Component/lms.jsx";
import Live from "./Component/live.jsx";
import ExamBuilder from "./Component/ExamBuilder.jsx";
import ContactUs from "./Component/contactus.jsx";
import Pricing from "./Component/Pricing.jsx"; 
import Blog from "./Component/Blog.jsx";
import HelpGuide from "./Component/HelpGuide.jsx";

const App = () => {
  const [exams, setExams] = useState([]);

  const addExam = (exam) => {
    setExams([...exams, exam]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/lms" element={<Lms />} />
      <Route path="/builder" element={<ExamBuilder onAddExam={addExam} />} />
      <Route path="/live" element={<Live exams={exams} />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/helpguide" element={<HelpGuide />} />

      {/* 404 fallback */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
