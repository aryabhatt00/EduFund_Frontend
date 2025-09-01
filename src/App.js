import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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

  // ✅ Hide navbar only on home and admin login page
 const hideNavbar =
  location.pathname === "/" || location.pathname.startsWith("/admin");


  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer/create" element={<CreateCustomer />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/customer/find" element={<FindCustomer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/admin/delete-account" element={<DeleteAccount />} />
      </Routes>
    </div>
  );
}

export default App;
