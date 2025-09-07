// App.jsx
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

  // ✅ Only hide navbar on admin login and root page
  const hideNavbar =
    location.pathname === "/admin/login" || location.pathname === "/";

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* 🔄 Redirect root based on role */}
        <Route
          path="/"
          element={
            isAdmin ? (
              <Navigate to="/admin" replace />
            ) : isCustomer ? (
              <Home />
            ) : (
              <CustomerLogin />
            )
          }
        />

        {/* 👤 Customer-only routes */}
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

        {/* 🧑‍💼 Admin-only routes */}
        <Route
          path="/admin"
          element={isAdmin ? <Admin /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/delete-account"
          element={isAdmin ? <DeleteAccount /> : <Navigate to="/admin/login" />}
        />

        {/* 🔐 Auth routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />

        {/* 🔄 Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
