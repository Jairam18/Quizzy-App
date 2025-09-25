import React from "react";
import { FaUser, FaQuestionCircle, FaChartLine, FaCog, FaComments, FaHeadset } from "react-icons/fa";

const HelpGuide = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: <FaUser className="text-green-500" />,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Sign up with your email or social account.</li>
          <li>Verify your email to activate your Quizzy account.</li>
          <li>Complete your profile to get personalized quiz recommendations.</li>
        </ul>
      ),
      bgColor: "bg-green-50",
      titleColor: "text-green-600",
    },
    {
      title: "Taking Quizzes",
      icon: <FaQuestionCircle className="text-blue-500" />,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Select a quiz category (Science, Math, History, or General Knowledge).</li>
          <li>Read the questions carefully and select the correct answer.</li>
          <li>Each quiz has a timer — make sure to complete before time runs out.</li>
          <li>Submit the quiz to see your results instantly.</li>
        </ul>
      ),
      bgColor: "bg-blue-50",
      titleColor: "text-blue-600",
    },
    {
      title: "Tracking Progress",
      icon: <FaChartLine className="text-yellow-500" />,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>View your quiz history and scores in your dashboard.</li>
          <li>Track your performance by category and topic.</li>
          <li>Receive personalized recommendations for improvement.</li>
        </ul>
      ),
      bgColor: "bg-yellow-50",
      titleColor: "text-yellow-600",
    },
    {
      title: "Account Management",
      icon: <FaCog className="text-purple-500" />,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Update your profile and preferences anytime.</li>
          <li>Change your password from the account settings page.</li>
          <li>Manage notifications and email subscriptions.</li>
          <li>Contact support if you encounter any issues.</li>
        </ul>
      ),
      bgColor: "bg-purple-50",
      titleColor: "text-purple-600",
    },
    {
      title: "Frequently Asked Questions (FAQs)",
      icon: <FaComments className="text-pink-500" />,
      content: (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>
            <strong>Q:</strong> Can I retake a quiz? <br /> <strong>A:</strong> Yes, you can retake quizzes anytime to improve your score.
          </li>
          <li>
            <strong>Q:</strong> Is Quizzy free? <br /> <strong>A:</strong> Quizzy offers free quizzes, with premium content available in the Pricing section.
          </li>
          <li>
            <strong>Q:</strong> Can I challenge friends? <br /> <strong>A:</strong> Yes, share quizzes and compete with friends using the leaderboards.
          </li>
          <li>
            <strong>Q:</strong> How do I reset my password? <br /> <strong>A:</strong> Go to Account Settings → Change Password, or use the "Forgot Password" option on login.
          </li>
        </ul>
      ),
      bgColor: "bg-pink-50",
      titleColor: "text-pink-600",
    },
  ];

  const SectionCard = ({ title, icon, content, bgColor, titleColor }) => (
    <div className={`mb-6 p-6 ${bgColor} rounded-2xl shadow-md transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg mx-auto w-full max-w-3xl`}>
      <div className="flex items-center justify-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <h2 className={`text-2xl font-bold ${titleColor}`}>{title}</h2>
      </div>
      <div className="flex justify-center">
        <div className="text-left w-full max-w-2xl">
          {content}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50 py-8 px-4 font-sans">
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
            Quizzy Help Guide
          </h1>
          <p className="text-gray-600 mt-3 text-lg">Everything you need to know to master Quizzy</p>
        </div>
        
        {/* Help Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <SectionCard
              key={index}
              title={section.title}
              icon={section.icon}
              content={section.content}
              bgColor={section.bgColor}
              titleColor={section.titleColor}
            />
          ))}
        </div>
        
        {/* Contact Support */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-gray-50 shadow-inner mx-auto max-w-2xl">
          <FaHeadset className="text-4xl text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Need More Help?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you
          </p>
          <button
            onClick={() => window.location.href = "/contact"}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpGuide;