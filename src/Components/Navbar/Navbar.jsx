import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const AppNavbar = () => {
  const [role, setRole] = useState(null); // 'admin' | 'customer' | null
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 This triggers effect on route change

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

    checkLogin(); // On load + route change
  }, [location]); // 🔥 re-check on every route change

  const handleLogout = () => {
    if (role === "customer") {
      localStorage.removeItem("customerToken");
      localStorage.removeItem("customerName");
      localStorage.removeItem("customerEmail");
    } else if (role === "admin") {
      localStorage.removeItem("adminToken");
    }
    localStorage.removeItem("isLoggedIn");
    setRole(null);
    navigate("/");
  };

  const userName = localStorage.getItem("customerName") || "Customer";

  // ❌ No navbar for Admin
  if (role === "admin") {
    return null;
  }

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
      className="app-navbar px-3 shadow-sm"
    >
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
                <Nav.Link as={Link} to="/transactions?type=Transaction%20History">
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
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {!role && (
              <>
                <Nav.Link as={Link} to="/customer/create">
                  Create Account
                </Nav.Link>
                <Nav.Link as={Link} to="/customer/login">
                  Customer Login
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/login">
                  Admin Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
