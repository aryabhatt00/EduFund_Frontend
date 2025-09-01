import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Dropdown, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SessionTimer from "../../Components/SessionTimer/SessionTimer";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Transactions.css'
const Transaction = () => {
  const [input, setInput] = useState({ accountNumber: '', amount: '', otp: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedAction, setSelectedAction] = useState('Deposit');
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const loginTime = localStorage.getItem("customerLoginTime");
    if (!loginTime) return;
    const checkSession = () => {
      const elapsed = Math.floor((Date.now() - parseInt(loginTime)) / 1000);
      const remaining = 600 - elapsed;
      if (remaining <= 0) {
        alert("⏰ Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/customer/login";
      } else {
        setRemainingSeconds(remaining);
      }
    };
    checkSession();
    const interval = setInterval(checkSession, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (['Deposit', 'Withdraw', 'Transaction History'].includes(type)) {
      setSelectedAction(type);
      setResult(null);
      setError('');
      setOtpSent(false);
      setOtpVerified(false);
    }
  }, [location.search]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError('');
    setResult(null);
  };

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const handleRequestOtp = async () => {
    setError('');
    try {
      const res = await fetch("http://localhost:8080/bank/request-otp", {
        method: 'POST',
        headers,
        body: JSON.stringify({
          accountNumber: Number(input.accountNumber),
          amount: Number(input.amount),
          operation: selectedAction.toLowerCase(),
          email: localStorage.getItem("customerEmail") || ""
        })
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setOtpSent(true);
      alert("✅ OTP sent to your registered email.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("http://localhost:8080/bank/verify-otp", {
        method: 'POST',
        headers,
        body: JSON.stringify({
          accountNumber: Number(input.accountNumber),
          amount: Number(input.amount),
          operation: selectedAction.toLowerCase(),
          otp: input.otp,
          email: localStorage.getItem("customerEmail") || ""
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setOtpVerified(true);
      setResult(data);
      alert("✅ OTP verified. You can now proceed.");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      if (selectedAction === 'Transaction History') {
        const res = await fetch(
          `http://localhost:8080/bank/transactions?accountNumber=${input.accountNumber}`,
          { headers }
        );
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setResult(data);
        return;
      }

      if (!otpVerified) {
        setError("❌ Please verify OTP before continuing.");
        return;
      }

      const endpoint = selectedAction === 'Withdraw' ? 'withdraw' : 'deposit';
      const res = await fetch(`http://localhost:8080/bank/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          accountNumber: Number(input.accountNumber),
          amount: Number(input.amount)
        })
      });

      if (!res.ok) throw new Error("Transaction failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5">
     {/* Header with inline Session Timer beside Transaction title */}
<div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
<h3 className="mb-0">Transaction</h3>
<SessionTimer />
</div>


      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="number"
            name="accountNumber"
            value={input.accountNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {selectedAction !== 'Transaction History' && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={input.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!otpSent && (
              <Button variant="warning" onClick={handleRequestOtp} className="mb-3">
                Request OTP
              </Button>
            )}

            {otpSent && !otpVerified && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    value={input.otp}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="success" onClick={handleVerifyOtp} className="mb-3">
                  Verify OTP
                </Button>
              </>
            )}
          </>
        )}

        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="secondary">
            {selectedAction}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {['Deposit', 'Withdraw', 'Transaction History'].map(action => (
              <Dropdown.Item
                key={action}
                onClick={() => {
                  setSelectedAction(action);
                  setResult(null);
                  setError('');
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
              >
                {action}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button
          variant="primary"
          type="submit"
          disabled={
            !input.accountNumber ||
            (selectedAction !== 'Transaction History' && (!input.amount || !otpVerified))
          }
        >
          Submit
        </Button>
      </Form>

      {result && selectedAction !== 'Transaction History' && (
        <Alert variant="success" className="mt-3">
          <p><strong>{result.message}</strong></p>
          {result.depositAmount && <p>Deposit Amount: {result.depositAmount}</p>}
          {result.withdrawAmount && <p>Withdraw Amount: {result.withdrawAmount}</p>}
          {result.newBalance != null && <p>Current Balance: {result.newBalance}</p>}
        </Alert>
      )}


{result && selectedAction === 'Transaction History' && (
  <div className="mt-3">
    <h5>Account Balance: ${result.accountBalance.toFixed(2)}</h5>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Transaction ID</th>           {/* ✅ Fix label */}
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Balance After</th>
          <th>Account Number</th>
          <th>Customer Name</th>
        </tr>
      </thead>
      <tbody>
        {result.transactions.map(txn => (
          <tr key={txn.accountId}>
            <td>{txn.transactionId}</td>
            <td>{txn.transactionType}</td>
            <td>${txn.transactionAmount.toFixed(2)}</td>
            <td>{new Date(txn.transactionDate).toLocaleString()}</td>
            <td>${txn.balanceAfterTransaction.toFixed(2)}</td>
            <td>{txn.accountNumber}</td>
            <td>{txn.customerName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)}




      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default Transaction;
