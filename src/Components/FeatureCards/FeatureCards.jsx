// src/components/FeatureCards/FeatureCards.jsx

import React from "react";
import "./FeatureCards.css";

const features = [
 { icon: "💳", title: "Student Banking", description: "Open and manage accounts tailored for student needs." },
  { icon: "🏦", title: "Digital Transactions", description: "Send and receive money instantly and securely." },
  { icon: "📈", title: "Budget Tracking", description: "Monitor your spending and stay on top of your finances." },
  { icon: "🔐", title: "Safe & Secure", description: "Bank with confidence using strong security measures." },
  { icon: "📚", title: "Education Focused", description: "Designed with students' financial goals in mind." },
  { icon: "🧾", title: "Bill Payments", description: "Easily pay tuition, rent, and other student expenses." }
];

const FeatureCards = () => {
  return (
    <div className="feature-section">
      <h2 className="section-title">
        Why Choose <span className="ai-text">AI Bank</span>?
      </h2>
      <div className="card-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="flash-card">
            <div className="card-inner">
              <div className="card-front">
                <div>
                  <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span><br />
                  {feature.title}
                </div>
              </div>
              <div className="card-back">
                {feature.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
