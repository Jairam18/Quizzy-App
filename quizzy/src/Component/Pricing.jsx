import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const plans = [
    {
      name: "Essentials",
      price: "$17",
      period: "/ month",
      billing: "$204 billed yearly",
      features: [
        "500 responses a month",
        "1 Administrator",
        "Unlimited quizzes and questions",
        "Private or public sharing option",
        "Live quizzes",
        "Auto scoring and grading",
        "Create tests in any language",
        "Access to the question bank",
        "and more..."
      ],
      button: "JOIN ESSENTIALS YEARLY",
      color: "from-blue-100 to-blue-200",
      borderColor: "border-blue-300",
      textColor: "text-blue-700"
    },
    {
      name: "Premium",
      price: "$25",
      period: "/ month",
      billing: "$300 billed yearly",
      features: [
        "all essentials features +",
        "2,000 responses a month",
        "2 Administrators or Trainers",
        "Learning paths",
        "Sell quizzes, tests or courses",
        "Custom certificates",
        "Embed quizzes and respondent portals",
        "Custom email notifications",
        "Self-registration",
        "and more..."
      ],
      button: "JOIN PREMIUM YEARLY",
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300",
      textColor: "text-purple-700",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$60",
      period: "/ month",
      billing: "$720 billed yearly",
      features: [
        "all premium features +",
        "25,000 responses a month",
        "15 Administrators or Trainers",
        "White label emails",
        "100 custom groups",
        "APIs and webhooks",
        "Single sign-on",
        "Custom CSS",
        "Priority support 24/7",
        "and more..."
      ],
      button: "JOIN ENTERPRISE YEARLY",
      color: "from-gray-100 to-gray-200",
      borderColor: "border-gray-300",
      textColor: "text-gray-700"
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(data.name)) newErrors.name = "Enter a valid cardholder name.";
    if (!/^\d{16}$/.test(data.cardNumber)) newErrors.cardNumber = "Card number must be 16 digits.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry)) newErrors.expiry = "Expiry must be in MM/YY format.";
    if (!/^\d{3}$/.test(data.cvv)) newErrors.cvv = "CVV must be 3 digits.";
    return newErrors;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value.trim(),
      cardNumber: e.target.cardNumber.value.trim(),
      expiry: e.target.expiry.value.trim(),
      cvv: e.target.cvv.value.trim(),
    };

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setPaymentDone(true);

    setTimeout(() => {
      alert(`✅ Payment successful for ${selectedPlan.name} plan!`);
      setSelectedPlan(null);
      setPaymentDone(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 md:p-8">
      {!selectedPlan ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Choose Your Plan
          </h1>

          <div className="flex flex-row justify-center items-start gap-8 w-full max-w-7xl">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`floating-card card-${index} relative bg-gradient-to-b ${plan.color} rounded-2xl shadow-xl transform transition-all duration-500 p-6 md:p-8 w-full max-w-sm flex flex-col border ${plan.borderColor} ${plan.popular ? "ring-2 ring-purple-500 ring-opacity-50" : ""} hover:-translate-y-6 hover:shadow-2xl`}
              >
                {/* Shadow Glow */}
                <div className="absolute inset-0 rounded-2xl blur-3xl opacity-30 bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 z-0"></div>

                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-40 bg-purple-600 text-white text-sm font-bold text-center py-1 rounded-full z-10">
                    MOST POPULAR
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center z-10">{plan.name}</h2>

                <div className="text-center mb-4 z-10">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 text-md md:text-lg">{plan.period}</span>
                </div>

                <p className="text-gray-600 text-center mb-6 text-sm z-10">{plan.billing}</p>

                <ul className="mb-6 md:mb-8 space-y-2 md:space-y-3 text-gray-700 text-sm flex-grow z-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`${plan.textColor} mt-1`}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className="mt-auto bg-black hover:bg-gray-900 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-300 z-10"
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white shadow-2xl rounded-xl p-6 md:p-8 w-full max-w-md border border-gray-200">
          {!paymentDone ? (
            <>
              <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Payment for {selectedPlan.name}
              </h1>
              <p className="mb-6 text-lg text-gray-700 text-center">
                Amount: <span className="font-bold text-indigo-700">{selectedPlan.price} {selectedPlan.period}</span>
                <br />
                <span className="text-sm text-gray-500">{selectedPlan.billing}</span>
              </p>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <input type="text" name="name" placeholder="Cardholder Name" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"/>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="text" name="cardNumber" placeholder="Card Number" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"/>
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <input type="text" name="expiry" placeholder="MM/YY" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"/>
                    {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
                  </div>
                  <div className="w-1/2">
                    <input type="text" name="cvv" placeholder="CVV" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"/>
                    {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                  </div>
                </div>
                <button type="submit" className="w-full bg-black hover:bg-gray-900 text-white p-3 rounded-lg font-semibold transition-colors duration-300 mt-4">
                  Pay Now
                </button>
              </form>
            </>
          ) : (
            <h2 className="text-center text-xl font-semibold text-green-600 animate-pulse">
              Processing payment...
            </h2>
          )}
        </div>
      )}

      {/* Floating Animation CSS */}
      <style jsx>{`
        @keyframes float1 { 0%{transform:translateY(0)}50%{transform:translateY(-8px) translateX(2px)}100%{transform:translateY(0)} }
        @keyframes float2 { 0%{transform:translateY(0)}50%{transform:translateY(-10px) translateX(-2px)}100%{transform:translateY(0)} }
        @keyframes float3 { 0%{transform:translateY(0)}50%{transform:translateY(-6px) translateX(1px)}100%{transform:translateY(0)} }

        .card-0 { animation: float1 4s ease-in-out infinite; }
        .card-1 { animation: float2 4.5s ease-in-out infinite; }
        .card-2 { animation: float3 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Pricing;
