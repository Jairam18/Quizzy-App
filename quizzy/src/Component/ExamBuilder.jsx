// src/Component/ExamBuilder.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExamBuilder({ onAddExam }) {
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", ""], correctOption: 0 },
  ]);
  const [openDate, setOpenDate] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const navigate = useNavigate();

  // Handlers
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, optIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctOption = optIndex;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push("");
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", ""], correctOption: 0 }]);
  };

  // ✅ Backend submission
  const handleSubmit = async () => {
    if (!examTitle.trim()) {
      alert("Please enter an exam title!");
      return;
    }
    if (!openDate || !openTime) {
      alert("Please select date and time!");
      return;
    }

    // Map questions correctly
    const mappedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      correctOption: q.correctOption,
      options: q.options.filter((opt) => opt.trim() !== ""),
    }));

    const examData = {
      examTitle,
      openDate,
      openTime,
      timer: `${timerMinutes}:${timerSeconds}`,
      questions: mappedQuestions,
    };

    try {
      // Correct backend URL
      const response = await axios.post("http://backend:8081/api/exams", examData);

      alert("✅ Exam saved successfully!");
      console.log("Saved Exam:", response.data);

      if (onAddExam) onAddExam(response.data);

      // Reset form
      setExamTitle("");
      setQuestions([{ questionText: "", options: ["", ""], correctOption: 0 }]);
      setOpenDate("");
      setOpenTime("");
      setTimerMinutes(0);
      setTimerSeconds(0);

      navigate("/live");
    } catch (error) {
      console.error("❌ Error saving exam:", error.response || error);
      alert("Failed to save exam. Check backend server.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="card shadow-lg w-full max-w-4xl rounded-xl p-6 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center">📘 Exam Builder</h2>

        {/* Exam Title */}
        <div className="mb-4">
          <label className="form-label font-semibold">Exam Title</label>
          <input
            type="text"
            className="form-control"
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder="Enter exam title"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <label className="form-label font-semibold">Exam Date</label>
            <input
              type="date"
              className="form-control text-center"
              value={openDate}
              onChange={(e) => setOpenDate(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label font-semibold">Exam Time</label>
            <input
              type="time"
              className="form-control text-center"
              value={openTime}
              onChange={(e) => setOpenTime(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label font-semibold">Quiz Duration (Minutes)</label>
            <input
              type="number"
              min="0"
              className="form-control text-center"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4 mb-4 rounded bg-gray-50">
            <label className="font-semibold">Question {qIndex + 1}</label>
            <input
              type="text"
              className="form-control mb-3"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter question"
            />

            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex mb-2 items-center gap-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctOption === optIndex}
                  onChange={() => handleCorrectOptionChange(qIndex, optIndex)}
                />
                <input
                  type="text"
                  className="form-control"
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  placeholder={`Option ${optIndex + 1}`}
                />
              </div>
            ))}

            <button
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => handleAddOption(qIndex)}
            >
              ➕ Add Option
            </button>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button className="btn btn-success" onClick={handleAddQuestion}>
            ➕ Add Question
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            💾 Save Exam
          </button>
        </div>
      </div>
    </div>
  );
}
