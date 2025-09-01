import React from 'react';
import './FlashCards.css';

const flashData = [
  { title: '💸 Deposit', description: 'Add money to your account securely and instantly.' },
  { title: '💵 Withdraw', description: 'Easily take out funds when you need them.' },
  { title: '📜 Transactions', description: 'Track all deposits, withdrawals, and activity.' },
  { title: '🔍 Find Account', description: 'Locate your account using your details and security Qs.' },
  { title: '🧾 New Account', description: 'Create a new bank account with a few easy steps.' },
  { title: '🚪 Log Out', description: 'Sign out of your session safely.' },
  { title: '🔐 OTP Protection', description: 'Verify high-value actions with secure OTPs.' },
  { title: '🛡️ Admin Only', description: 'Restricted tools for system administrators.' }
];

const FlashCards = () => {
  return (
    <div className="flashcard-section">
      <h2 className="section-title">How Campus Bank Works</h2>
      <div className="card-grid fixed-grid">
        {flashData.map((card, index) => (
          <div key={index} className="flash-card">
            <div className="card-inner">
              <div className="card-front">
                <h4 className="card-title">{card.title}</h4>
              </div>
              <div className="card-back">
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashCards;
