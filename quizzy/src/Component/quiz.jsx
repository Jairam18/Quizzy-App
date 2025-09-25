// Quiz.jsx
import React, { useState } from "react";

export default function Quiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", ""], correctOption: 0 },
  ]);
  const [preview, setPreview] = useState(false);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: ["", ""], correctOption: 0 }]);
  };

  const removeQuestion = (qIndex) => {
    const updated = [...questions];
    updated.splice(qIndex, 1);
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, oIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length > 1) {
      updated[qIndex].options.splice(oIndex, 1);
      if (updated[qIndex].correctOption >= updated[qIndex].options.length) {
        updated[qIndex].correctOption = 0;
      }
      setQuestions(updated);
    }
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctOption = oIndex;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    console.log("Quiz Data:", { quizTitle, questions });
    alert("Quiz saved! Check console for data.");
  };

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz Builder</h2>

      <input
        type="text"
        placeholder="Enter Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="quiz-input"
      />

      <button
        className="preview-btn"
        onClick={() => setPreview(!preview)}
      >
        {preview ? "Edit Quiz" : "Preview Quiz"}
      </button>

      {!preview &&
        questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            <div className="question-header">
              <h4>Question {qIndex + 1}</h4>
              <button className="remove-btn" onClick={() => removeQuestion(qIndex)}>Remove</button>
            </div>

            <input
              type="text"
              placeholder="Enter question text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="question-input"
            />

            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="option-row">
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  className="option-input"
                />
                <input
                  type="radio"
                  name={`correctOption-${qIndex}`}
                  checked={q.correctOption === oIndex}
                  onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                />
                <span className="correct-label">Correct</span>
                <button className="remove-btn" onClick={() => removeOption(qIndex, oIndex)}>Remove</button>
              </div>
            ))}

            <button className="add-btn" onClick={() => addOption(qIndex)}>Add Option</button>
          </div>
        ))}

      {preview && (
        <div className="preview-section">
          <h3>Preview: {quizTitle}</h3>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="preview-question">
              <strong>{qIndex + 1}. {q.questionText}</strong>
              <ul>
                {q.options.map((opt, oIndex) => (
                  <li key={oIndex}>
                    {opt} {q.correctOption === oIndex && "(Correct)"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {!preview && (
        <div className="quiz-actions">
          <button className="add-btn" onClick={addQuestion}>Add Question</button>
          <button className="save-btn" onClick={handleSubmit}>Save Quiz</button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .quiz-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          padding: 20px;
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .quiz-title {
          text-align: center;
          margin-bottom: 20px;
        }
        .quiz-input {
          width: 80%;
          max-width: 500px;
          padding: 12px;
          font-size: 16px;
          margin-bottom: 20px;
          border-radius: 6px;
          border: 1px solid #ccc;
          text-align: center;
        }
        .preview-btn {
          padding: 10px 15px;
          border: none;
          border-radius: 6px;
          background-color: #28a745;
          color: white;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .question-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          background-color: #fff;
          width: 80%;
          max-width: 600px;
        }
        .question-header {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 10px;
        }
        .remove-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        .question-input, .option-input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          text-align: center;
        }
        .option-row {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;
          gap: 10px;
          flex-wrap: wrap;
        }
        .correct-label {
          margin-left: 5px;
        }
        .add-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
        .save-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 10px;
        }
        .quiz-actions {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .preview-section {
          border-top: 2px solid #000;
          padding-top: 20px;
          width: 80%;
          max-width: 600px;
          text-align: center;
        }
        .preview-question {
          margin-bottom: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
