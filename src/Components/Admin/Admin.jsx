import React, { useState, useEffect } from 'react';
import { Container, Table, Tabs, Tab, Spinner, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = () => {
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // Redirect to login if token is missing
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    Promise.all([
      fetch("http://localhost:8080/admin/customers", { headers }).then(res => res.json()),
      fetch("http://localhost:8080/admin/accounts", { headers }).then(res => res.json()),
      fetch("http://localhost:8080/admin/transactions", { headers }).then(res => res.json())
    ])
      .then(([customersData, accountsData, transactionsData]) => {
        setCustomers(customersData);
        setAccounts(accountsData);
        setTransactions(transactionsData);
      })
      .catch(err => {
        console.error("Failed to fetch admin data", err);
        alert("Session expired or unauthorized. Please login again.");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading Admin Panel...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4 mb-4" style={{ backgroundColor: '#f4f9ff', borderRadius: '12px' }}>
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold" style={{ color: '#003b99' }}>Welcome, Admin 👨‍💼</h3>
          <Button
            variant="primary"
            onClick={() => navigate("/admin/delete-account")}
            style={{
              backgroundColor: "#0052cc",
              border: "none",
              borderRadius: "20px",
              padding: "8px 18px",
              fontWeight: "bold"
            }}
          >
            Delete Account
          </Button>
        </div>
      </Card>

      <Tabs defaultActiveKey="customers" className="mb-3" fill>
        <Tab eventKey="customers" title="👤 Customers">
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#e9f0fb" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.customerId}>
                  <td>{c.customerId}</td>
                  <td>{c.customerName}</td>
                  <td>{c.customerEmail}</td>
                  <td>{c.customerPhone}</td>
                  <td>{c.customerDateOfBirth}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="accounts" title="💳 Accounts">
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#e9f0fb" }}>
              <tr>
                <th>Account ID</th>
                <th>Account Number</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => (
                <tr key={a.accountId}>
                  <td>{a.accountId}</td>
                  <td>{a.accountNumber}</td>
                  <td>${a.accountBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="transactions" title="📄 Transactions">
          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: "#e9f0fb" }}>
              <tr>
    <th>ID</th>
    <th>Type</th>
    <th>Amount</th>
    <th>Balance After</th>
    <th>Date</th>
    <th>Account Number</th>
    <th>Customer Name</th>
  </tr>
</thead>
<tbody>
  {transactions.map(t => (
    <tr key={t.transactionId}>
      <td>{t.transactionId}</td>
      <td>{t.transactionType}</td>
      <td>${t.transactionAmount.toFixed(2)}</td>
      <td>${t.balanceAfterTransaction.toFixed(2)}</td>
      <td>{new Date(t.transactionDate).toLocaleString()}</td>
      <td>{t.accountNumber}</td>
      <td>{t.customerName}</td>
    </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin;
