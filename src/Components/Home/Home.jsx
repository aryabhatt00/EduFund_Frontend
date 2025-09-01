// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FeatureCards from "../../Components/FeatureCards/FeatureCards";
import FlashCards from "../../Components/FlashCards/FlashCards";
import logo from "../../Assets/logo.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [remainingSeconds, setRemainingSeconds] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: localStorage.getItem("customerName") || "User",
    email: localStorage.getItem("customerEmail") || "",
    accountNumber: localStorage.getItem("accountNumber") || "",
  });

  useEffect(() => {
    const syncLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserDetails({
        name: localStorage.getItem("customerName") || "User",
        email: localStorage.getItem("customerEmail") || "",
        accountNumber: localStorage.getItem("accountNumber") || "",
      });
    };
    window.addEventListener("storage", syncLoginStatus);
    return () => window.removeEventListener("storage", syncLoginStatus);
  }, []);

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

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/customer/login");
  };

  return (
    <>
      {isLoggedIn && remainingSeconds != null && (
        <Alert variant="info" className="text-center rounded-0 mb-0">
          Session expires in: {Math.floor(remainingSeconds / 60)}:
          {(remainingSeconds % 60).toString().padStart(2, "0")}
        </Alert>
      )}

      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center p-4 home-wrapper">
        <div className="shadow rounded w-100 home-container" style={{ maxWidth: "1300px" }}>
          <Row className="align-items-stretch">
            {/* LEFT 50% */}
            <Col md={6} className="p-4 bg-light">
              <Row className="h-100">
                {/* LEFT 50% of LEFT HALF: Welcome Text + Buttons */}
                <Col md={6} className="d-flex flex-column justify-content-center">
                  <div>
                    {!isLoggedIn ? (
                      <>
                        <h2>Welcome to <span className="text-primary">EduFund</span></h2>
                        <p className="text-muted">
                          Empower your financial journey with a secure and intuitive platform built for students
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="text-primary">Welcome, {userDetails.name}</h2>
                        {userDetails.email && <p className="text-muted mb-1">Email: {userDetails.email}</p>}
                        {userDetails.accountNumber && <p className="text-muted">Account Number: {userDetails.accountNumber}</p>}
                      </>
                    )}

                    <div className="d-flex gap-3 mt-3 flex-wrap">
                      {!isLoggedIn ? (
                        <>
                          <Link to="/customer/login" className="btn btn-success">Login</Link>
                          <Link to="/customer/create" className="btn btn-secondary">Register</Link>
                        </>
                      ) : (
                        <>
                          <Link to="/transactions?type=Deposit" className="btn btn-outline-primary">Deposit</Link>
                          <Link to="/transactions?type=Withdraw" className="btn btn-outline-primary">Withdraw</Link>
                          <Link to="/transactions" className="btn btn-outline-primary">Transactions</Link>
                          <Link to="/customer/find" className="btn btn-outline-primary">Find Customer</Link>
                          <Button variant="danger" onClick={handleLogout}>Logout</Button>
                        </>
                      )}
                    </div>
                  </div>
                </Col>

                {/* RIGHT 50% of LEFT HALF: Bank Icon */}
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={logo} alt="Bank Icon" className="img-fluid bank-icon" />
                </Col>
              </Row>
            </Col>

            {/* RIGHT 50%: FeatureCards or FlashCards */}
            <Col md={6} className="feature-pane d-flex flex-column justify-content-center">
              {!isLoggedIn ? <FeatureCards /> : <FlashCards />}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
  