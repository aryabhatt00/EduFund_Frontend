import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const AppNavbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const isAdmin = !!localStorage.getItem("adminToken");
      const isCustomer = !!localStorage.getItem("customerToken");

      if (isAdmin) {
        setRole("admin");
      } else if (isCustomer) {
        setRole("customer");
      } else {
        setRole(null);
      }
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    if (role === "admin") {
      localStorage.removeItem("adminToken");
    } else if (role === "customer") {
      localStorage.removeItem("customerToken");
      localStorage.removeItem("customerName");
      localStorage.removeItem("customerEmail");
    }
    localStorage.removeItem("isLoggedIn");
    setRole(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const userName =
    role === "admin"
      ? "Admin"
      : localStorage.getItem("customerName") || "Customer";

  // ✅ Admin: Only show logout (no navbar at all)
  if (role === "admin") {
    return (
      <div
        style={{
          background: "#0e1f2b",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <span
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            background: "#e53935",
            padding: "6px 18px",
            borderRadius: "30px",
          }}
        >
          Logout
        </span>
      </div>
    );
  }

  // ✅ Customer or Guest: Show full navbar
  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-glow">
          💡EduFund
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            {role === "customer" && (
              <>
                <Nav.Link as={Link} to="/transactions?type=Deposit">
                  Deposit
                </Nav.Link>
                <Nav.Link as={Link} to="/transactions?type=Withdraw">
                  Withdraw
                </Nav.Link>
                <Nav.Link as={Link} to="/transactions">
                  Transactions
                </Nav.Link>
                <NavDropdown
                  align="end"
                  title={
                    <span className="d-flex align-items-center">
                      <FaUserCircle size={20} className="me-2" />
                      {userName}
                    </span>
                  }
                  id="customer-dropdown"
                >
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!role && (
              <>
                <Nav.Link as={Link} to="/customer/create">Create Account</Nav.Link>
                <Nav.Link as={Link} to="/customer/login">Customer Login</Nav.Link>
                <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
