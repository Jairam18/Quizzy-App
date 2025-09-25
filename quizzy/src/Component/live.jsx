import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Live() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeExam, setActiveExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [examCountdowns, setExamCountdowns] = useState({});
  const [resultsHistory, setResultsHistory] = useState(
    JSON.parse(localStorage.getItem("resultsHistory")) || []
  );
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      try {
       const response = await axios.get("http://backend:8081/api/exams");

        setExams(response.data);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  useEffect(() => {
    const intervals = {};
    exams.forEach((exam, index) => {
      const updateCountdown = () => {
        if (!exam.openDate || !exam.openTime) {
          setExamCountdowns((prev) => ({ ...prev, [index]: 0 }));
          return;
        }
        const now = new Date();
        const examTime = new Date(`${exam.openDate}T${exam.openTime}`);
        const diff = Math.floor((examTime - now) / 1000);
        setExamCountdowns((prev) => ({ ...prev, [index]: diff }));
      };
      updateCountdown();
      intervals[index] = setInterval(updateCountdown, 1000);
    });
    return () => Object.values(intervals).forEach(clearInterval);
  }, [exams]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0 && activeExam) handleSubmit();
  }, [timer, activeExam]);

  useEffect(() => {
    localStorage.setItem("resultsHistory", JSON.stringify(resultsHistory));
  }, [resultsHistory]);

  const handleStartExam = (exam) => {
    setActiveExam(exam);
    setCurrentQuestion(0);
    setAnswers({});
    if (exam.timer) {
      const [min, sec] = exam.timer.split(":");
      setTimer(Number(min) * 60 + (sec ? Number(sec) : 0));
    }
  };

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!activeExam) return;

    const score = activeExam.questions.reduce((acc, q, idx) => {
      return answers[idx] === q.correctOption ? acc + 1 : acc;
    }, 0);

    const result = {
      examTitle: activeExam.examTitle,
      totalQuestions: activeExam.questions.length,
      score,
      date: new Date().toLocaleString(),
    };

    setResultsHistory((prev) => [...prev, result]);
    alert(`Exam Submitted! You scored ${score}/${activeExam.questions.length}`);

   await axios.put(`http://backend:8081/api/exams/complete/${activeExam.id}`);

    setExams((prev) => prev.filter((e) => e.id !== activeExam.id));

    setActiveExam(null);
    setAnswers({});
    setCurrentQuestion(0);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold">Loading exams...</p>
      </div>
    );
  }

  if (!activeExam) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-900">
          Live Exams
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {exams.length === 0 ? (
            <p className="text-gray-500 text-lg">No exams available.</p>
          ) : (
            exams.map((exam, index) => {
              const countdown = examCountdowns[index] || 0;
              const available = countdown <= 0;
              const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5"];
              const bgColor = colors[index % colors.length];

              return (
                <div
                  key={exam.id}
                  className="flex flex-col justify-between items-center p-6 rounded-xl shadow-lg transition-transform hover:scale-105 text-center"
                  style={{
                    width: "260px",
                    backgroundColor: bgColor,
                    borderLeft: `6px solid ${
                      bgColor === "#FFEBEE"
                        ? "#E53935"
                        : bgColor === "#E3F2FD"
                        ? "#1E88E5"
                        : bgColor === "#E8F5E9"
                        ? "#43A047"
                        : bgColor === "#FFF3E0"
                        ? "#FB8C00"
                        : "#8E24AA"
                    }`,
                  }}
                >
                  <h5 className="font-bold text-xl mb-2">{exam.examTitle}</h5>
                  <p className="text-sm mb-2 text-gray-700">
                    {exam.openDate && exam.openTime
                      ? `Scheduled: ${exam.openDate} ${exam.openTime}`
                      : "Not Scheduled"}
                  </p>
                  {exam.timer && (
                    <p className="text-sm mb-2 font-medium">Duration: {exam.timer}</p>
                  )}
                  {!available && (
                    <p className="text-red-600 font-semibold mb-2">
                      Starts in: {formatTime(countdown)}
                    </p>
                  )}

                  <button
                    onClick={() => handleStartExam(exam)}
                    disabled={!available}
                    className="w-full px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 disabled:bg-gray-400 mb-2"
                  >
                    {available ? "Start Exam" : "Not Available Yet"}
                  </button>

                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
                  >
                    View Results
                  </button>
                </div>
              );
            })
          )}
        </div>

        {showResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl relative">
              <button
                className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => setShowResults(false)}
              >
                Close
              </button>
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-900">
                Results History
              </h3>
              {resultsHistory.length === 0 ? (
                <p className="text-center text-gray-500">No results yet.</p>
              ) : (
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Exam Title</th>
                      <th className="border px-4 py-2">Score</th>
                      <th className="border px-4 py-2">Total Questions</th>
                      <th className="border px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsHistory.map((res, idx) => (
                      <tr key={idx} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{res.examTitle}</td>
                        <td className="border px-4 py-2">{res.score}</td>
                        <td className="border px-4 py-2">{res.totalQuestions}</td>
                        <td className="border px-4 py-2">{res.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  const question = activeExam?.questions?.[currentQuestion];
  if (!question) return <p>Loading question...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-2 text-blue-900">{activeExam.examTitle}</h2>
        <p className="text-red-500 font-semibold mb-4">
          Time Remaining: {formatTime(timer)}
        </p>

        <div className="mb-4 p-4 border rounded bg-gray-50 text-left">
          <p className="font-semibold mb-3">
            Q{currentQuestion + 1}: {question.questionText}
          </p>
          <div className="flex flex-col gap-2">
            {question.options.map((opt, oIndex) => (
              <button
                key={oIndex}
                onClick={() => handleAnswer(currentQuestion, oIndex)}
                className={`px-3 py-2 rounded font-semibold border transition ${
                  answers[currentQuestion] === oIndex
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button
            onClick={() => setCurrentQuestion((p) => Math.max(p - 1, 0))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 disabled:bg-gray-400"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setCurrentQuestion((p) =>
                Math.min(p + 1, activeExam.questions.length - 1)
              )
            }
            disabled={currentQuestion === activeExam.questions.length - 1}
            className="px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:bg-gray-400"
          >
            Next
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
          >
            Finish Exam
          </button>
        </div>
      </div>
    </div>
  );
}
