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
    try {
      const res = await axios.post("http://localhost:8080/customer/create", form);
      const { message, customerId, accountNumber } = res.data;
      toast.success(`${message}\nCustomer ID: ${customerId}\nAccount: ${accountNumber}`);
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      toast.error(
        "Error: " + (err.response?.data?.message || JSON.stringify(err.response?.data) || err.message)
      );
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
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="customerEmail"
                  value={form.customerEmail}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="customerPhone"
                  value={form.customerPhone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="customerDateOfBirth"
                  value={form.customerDateOfBirth}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Account Balance</Form.Label>
                <Form.Control
                  type="number"
                  name="customerAccount.accountBalance"
                  value={form.customerAccount.accountBalance}
                  onChange={handleChange}
                  placeholder="Initial balance"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Security Q1: Place of birth</Form.Label>
                <Form.Control
                  name="question1"
                  value={form.question1}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Security Q2: Favorite movie</Form.Label>
                <Form.Control
                  name="question2"
                  value={form.question2}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Security Q3: Favorite teacher</Form.Label>
                <Form.Control
                  name="question3"
                  value={form.question3}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Street Name</Form.Label>
                <Form.Control
                  name="customerAddress.streetName"
                  value={form.customerAddress.streetName}
                  onChange={handleChange}
                  placeholder="Street"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  name="customerAddress.pinCode"
                  value={form.customerAddress.pinCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  name="customerAddress.countryName"
                  value={form.customerAddress.countryName}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
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
