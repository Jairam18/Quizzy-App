// src/Component/Blog.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
  navigate("/"); // Redirects to Home.jsx
};


  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-2xl rounded-3xl">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Quizzy: Revolutionizing the Way You Learn
        </h1>

        {/* Intro */}
        <p className="mb-8 text-lg text-gray-700 leading-relaxed text-center">
          Learning isn’t just about reading textbooks anymore. It’s about interactive, engaging, and personalized experiences that make knowledge stick. 
          <strong className="text-blue-600"> Quizzy</strong> makes learning fun, interactive, and effective.
        </p>

        {/* What is Quizzy */}
        <div className="mb-8 p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">What is Quizzy?</h2>
          <p className="text-gray-700 mb-4">
            <strong>Quizzy</strong> is an online quiz platform where users can test their knowledge across various topics. 
            Whether you’re a student preparing for exams, a professional looking to sharpen skills, or a trivia lover, Quizzy has something for everyone.
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Take quizzes on a wide range of subjects.</li>
            <li>Track your performance and progress over time.</li>
            <li>Compete with friends or challenge yourself in timed quizzes.</li>
          </ul>
        </div>

        {/* Key Features */}
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Key Features of Quizzy</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-purple-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-purple-600">Interactive Quizzes</h3>
            <p className="text-gray-700">
              Forget boring multiple-choice questions. Quizzy offers quizzes that are visually engaging, interactive, and fun.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-green-600">Real-Time Feedback</h3>
            <p className="text-gray-700">
              Get instant results for each quiz attempt, understand mistakes immediately, and learn faster.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-yellow-600">Personalized Experience</h3>
            <p className="text-gray-700">
              Quizzy adapts to your skill level and suggests quizzes based on your interests and performance.
            </p>
          </div>

          <div className="p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-pink-600">Track Your Progress</h3>
            <p className="text-gray-700">
              Track improvement, see which areas need more practice, and celebrate your achievements.
            </p>
          </div>
        </div>

        {/* Why Choose Quizzy */}
        <div className="mb-8 p-6 bg-blue-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 text-center">Why Choose Quizzy?</h2>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Wide variety of quizzes across topics.</li>
            <li>Interactive and fun learning experience.</li>
            <li>Compete with friends via leaderboards.</li>
            <li>Accessible anywhere, anytime.</li>
          </ul>
        </div>

        {/* How to Get Started */}
        <div className="mb-8 p-6 bg-green-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-3xl font-bold mb-4 text-green-600 text-center">How to Get Started</h2>
          <ol className="list-decimal ml-6 space-y-2 text-gray-700">
            <li><strong>Sign Up</strong> – Create your free account in minutes.</li>
            <li><strong>Choose a Quiz</strong> – Pick your favorite category.</li>
            <li><strong>Start Quizzing</strong> – Track your score and improve.</li>
            <li><strong>Challenge Friends</strong> – Share quizzes and compete.</li>
          </ol>
        </div>

        {/* Conclusion */}
        <div className="text-center">
          <p className="text-lg font-semibold text-purple-600 mb-4">
            With <strong>Quizzy</strong>, learning is no longer a chore — it’s a game. Make learning interactive, fun, and rewarding.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
