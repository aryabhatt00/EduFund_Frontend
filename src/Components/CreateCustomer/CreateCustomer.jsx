import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateCustomer.css";

const CreateCustomer = () => {
  const [form, setForm] = useState({
    customerName: "",
    customerDateOfBirth: "",
    customerEmail: "",
    customerPhone: "",
    password: "",
    question1: "",
    question2: "",
    question3: "",
    customerAddress: {
      streetName: "",
      countryName: "",
      pinCode: "",
    },
    customerAccount: {
      accountBalance: "",
    },
  });

  const [errors, setErrors] = useState({});
  const API = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("customerAddress.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        customerAddress: { ...prev.customerAddress, [field]: value },
      }));
    } else if (name.startsWith("customerAccount.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        customerAccount: { ...prev.customerAccount, [field]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});

  try {
    const res = await axios.post(`${API}/customer/create`, form);
    const { message, customerId, accountNumber } = res.data;

    // ✅ Show error toasts only for known messages
    if (message === "Email already exists") {
      toast.error("❌ This email is already registered.");
      return;
    }

    if (message === "Phone number already exists") {
      toast.error("❌ This phone number is already in use.");
      return;
    }

    // ✅ Only show success toast if ID & Account exist
    if (customerId && accountNumber) {
      toast.success(`✅ ${message}\n🆔 ID: ${customerId}\n🏦 Account: ${accountNumber}`);
    } else {
      toast.error(`🚫 ${message || "Something went wrong!"}`);
    }

  } catch (err) {
    console.error("Error details:", err.response?.data || err.message);
    if (err.response?.status === 400 && typeof err.response.data === "object") {
      setErrors(err.response.data);
    } else {
      toast.error("Error: " + (err.response?.data?.message || err.message));
    }
  }
};

  return (
    <Container className="fade-in py-4">
      <ToastContainer position="top-right" autoClose={3500} />
      <Card className="p-4 shadow-lg rounded-4 border-0">
        <h2 className="text-center text-primary mb-4">Create New Customer</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  isInvalid={!!errors.customerName}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customerName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter email"
                  isInvalid={!!errors.customerEmail}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customerEmail}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  isInvalid={!!errors.customerPhone}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customerPhone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="customerDateOfBirth"
                  value={form.customerDateOfBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.customerDateOfBirth}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.customerDateOfBirth}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Account Balance</Form.Label>
                <Form.Control
                  type="number"
                  name="customerAccount.accountBalance"
                  value={form.customerAccount.accountBalance}
                  onChange={handleChange}
                  placeholder="Initial balance"
                  isInvalid={!!errors["customerAccount.accountBalance"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors["customerAccount.accountBalance"]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Security Q1: Place of birth</Form.Label>
                <Form.Control
                  name="question1"
                  value={form.question1}
                  onChange={handleChange}
                  isInvalid={!!errors.question1}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.question1}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Security Q2: Favorite movie</Form.Label>
                <Form.Control
                  name="question2"
                  value={form.question2}
                  onChange={handleChange}
                  isInvalid={!!errors.question2}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.question2}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Security Q3: Favorite teacher</Form.Label>
                <Form.Control
                  name="question3"
                  value={form.question3}
                  onChange={handleChange}
                  isInvalid={!!errors.question3}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.question3}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  name="customerAddress.streetName"
                  value={form.customerAddress.streetName}
                  onChange={handleChange}
                  placeholder="Street"
                  isInvalid={!!errors["customerAddress.streetName"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors["customerAddress.streetName"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  name="customerAddress.pinCode"
                  value={form.customerAddress.pinCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  isInvalid={!!errors["customerAddress.pinCode"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors["customerAddress.pinCode"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="customerAddress.countryName"
                  value={form.customerAddress.countryName}
                  onChange={handleChange}
                  placeholder="Country"
                  isInvalid={!!errors["customerAddress.countryName"]}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors["customerAddress.countryName"]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-3">
            <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill">
              Create Customer
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateCustomer;
