import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const FindCustomer = () => {
  const [input, setInput] = useState({ email: '', phone: '' ,question1: '', question2: '', question3: ''});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    const token = localStorage.getItem("token"); 

    try {
      const res = await fetch('http://localhost:8080/customer/find', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: input.email,
    phone: Number(input.phone),
    question1: input.question1,
    question2: input.question2,
    question3: input.question3
  })
});


      if (!res.ok) {
        throw new Error('Customer not found');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <h3>Find Your Customer Details</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={input.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Security Question 1: What is your place of birth?</Form.Label>
          <Form.Control
            type="text"
            name="question1"
            value={input.question1}
            onChange={handleChange}
            required
          />
        </Form.Group>

                <Form.Group className="mb-3">
          <Form.Label> Security Question 2: What is your Favorite Movie?</Form.Label>
          <Form.Control
            type="text"
            name="question2"
            value={input.question2}
            onChange={handleChange}
            required
          />
        </Form.Group>

                <Form.Group className="mb-3">
          <Form.Label>  Security Question 3: Who is your Favorite Teacher?</Form.Label>
          <Form.Control
            type="text"
            name="question3"
            value={input.question3}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>

      {result && (
        <Alert variant="success" className="mt-3">
          <p><strong>Customer ID:</strong> {result.customerId}</p>
          <p><strong>Account Number:</strong> {result.accountNumber}</p>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-3">{error}</Alert>
      )}
    </Container>
  );
};

export default FindCustomer;
