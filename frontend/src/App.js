// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import LoginStaff from './components/LoginStaff';
import SignupStaff from './components/SignupStaff';
import Ldashboard from './components/Ldashboard';
import QRCreater from './components/QRCreater';
import Inventory from './components/Inventory';  // Import Inventory component
import Godown from './components/Godown';        // Import Godown component
import StaffGodown from './components/StaffGodown';
import Details from './components/Details';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginadmin" element={<AdminLogin />} />
        <Route path="/loginstaff" element={<LoginStaff />} />
        <Route path="/signupstaff" element={<SignupStaff/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="qr-creator" element={<QRCreater />} />
        <Route path="/ldashboard" element={<Ldashboard />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="godown" element={<Godown />} />
        <Route path="sgodown" element={<StaffGodown />} />
        <Route path="godown-detail" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
