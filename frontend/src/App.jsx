import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Payment from "./pages/Payments";
import Card from "./pages/Card";
import Budget from "./pages/Budget";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Admin from "./pages/admin-dashboard";
import User from "./pages/User-dashboard";
import Verifier from "./pages/verifier-dashboard";
import Loanform from "./pages/Loanform";
import "./style.css";

import "./App.css";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Loanform" element={<Loanform />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/card" element={<Card />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/verifier-dashboard" element={<Verifier />} />
        <Route path="/user-dashboard" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
