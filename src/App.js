import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import FindCustomer from './Components/FindCustomer/FindCustomer';
import CreateCustomer from './Components/CreateCustomer/CreateCustomer';
import Transaction from './Components/Transactions/Transactions';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Components/Admin/AdminLogin';
import CustomerLogin from './Components/CustomerLogin/CustomerLogin';
import DeleteAccount from './Components/Admin/DeleteAccount';

function App() {
  const location = useLocation();

  const isAdmin = !!localStorage.getItem("adminToken");
  const isCustomer = !!localStorage.getItem("customerToken");

  // ✅ Hide navbar only on "/" (home) and admin login
  const hideNavbar = location.pathname === "/" || location.pathname === "/admin/login";

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin" replace />
            ) : isCustomer ? (
              <Navigate to="/transactions" replace />
            ) : (
              <Home />
            )
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer/create"
          element={isCustomer ? <CreateCustomer /> : <Navigate to="/customer/login" />}
        />
        <Route
          path="/transactions"
          element={isCustomer ? <Transaction /> : <Navigate to="/customer/login" />}
        />
        <Route
          path="/customer/find"
          element={isCustomer ? <FindCustomer /> : <Navigate to="/customer/login" />}
        />
        <Route path="/customer/login" element={<CustomerLogin />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/delete-account"
          element={isAdmin ? <DeleteAccount /> : <Navigate to="/admin/login" />}
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
