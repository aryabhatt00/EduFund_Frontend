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
import CreateAccount from './Components/CreateAccount/CreateAccount';
import { Analytics } from '@vercel/analytics/react'; // ✅ NEW IMPORT

function App() {
  const location = useLocation();

  const isAdminLoggedIn = !!localStorage.getItem("adminToken");
  const isCustomerLoggedIn = !!localStorage.getItem("customerToken");

  // ❌ Hide Navbar only for admin routes when admin is logged in
  const hideNavbar =
    isAdminLoggedIn &&
    ["/admin", "/admin/login", "/admin/delete-account"].some((path) =>
      location.pathname.startsWith(path)
    );

  return (
    <div>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* PUBLIC + CUSTOMER ROUTES */}
        <Route
          path="/customer/create"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <CreateCustomer />
            )
          }
        />
        <Route path="/account/create" element={<CreateAccount />} />
        <Route path="/customer/find" element={<FindCustomer />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route
          path="/transactions"
          element={
            isCustomerLoggedIn ? (
              <Transaction />
            ) : (
              <Navigate to="/customer/login" />
            )
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <Admin />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/delete-account"
          element={
            isAdminLoggedIn ? (
              <DeleteAccount />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>

      <Analytics /> {/* ✅ Add Analytics tracking at the end */}
    </div>
  );
}

export default App;
