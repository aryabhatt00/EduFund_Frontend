import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './CreateAccount.css'; 

const CreateAccount = () => {
  const [account, setAccount] = useState({
    accountNumber: '',
    accountBalance: ''
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/account/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accountNumber: parseInt(account.accountNumber),
          accountBalance: parseFloat(account.accountBalance)
        })
      });

      const data = await res.text();
      setResponse({ success: true, message: data });

    } catch (error) {
      setResponse({ success: false, message: 'Failed to create account.' });
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h3>Create Account</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="number"
            name="accountNumber"
            value={account.accountNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Initial Balance</Form.Label>
          <Form.Control
            type="number"
            name="accountBalance"
            value={account.accountBalance}
            onChange={handleChange}
            required
            min="0"
          />
        </Form.Group>

        <Button variant="primary" type="submit">Create</Button>
      </Form>

      {response && (
        <Alert className="mt-3" variant={response.success ? 'success' : 'danger'}>
          {response.message}
        </Alert>
      )}
    </Container>
  );
};

export default CreateAccount;
