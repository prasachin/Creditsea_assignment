import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [dashboard, setdashboard] = useState("User");

  const handleDropdownSelect = (path) => {
    navigate(path);

    if (path === "/verifier-dashboard") {
      setdashboard("Verifier");
    } else if (path === "/admin-dashboard") {
      setdashboard("Admin");
    } else if (path === "/user-dashboard") {
      setdashboard("User");
    }
  };

  return (
    <nav className="navbar" style={{ position: "fixed", top: 0 }}>
      <div className="navbar-brand">
        <h2 style={{ fontWeight: "bold" }}>CREDIT APP</h2>
      </div>
      <ul className="navbar-menu">
        <li style={{ fontWeight: "bold" }}>
          <Link to="/home">
            <i className="bi bi-house" style={{ color: "green" }}></i> Home
          </Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/payments">
            <i className="bi bi-cash-stack" style={{ color: "green" }}></i>{" "}
            Payments
          </Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/budget">
            <i className="bi bi-journal-text" style={{ color: "green" }}></i>{" "}
            Budget
          </Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/card">
            <i className="bi bi-credit-card" style={{ color: "green" }}></i>{" "}
            Card
          </Link>
        </li>
      </ul>
      <ul className="navbar-icons">
        <li>
          <Link to="/notifications">
            <i className="bi bi-bell" style={{ color: "green" }}></i>
            <span className="notification-badge">4</span>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <i className="bi bi-chat-dots" style={{ color: "green" }}></i>
          </Link>
        </li>
        <li>
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="user-dropdown-offcanvas"
              className="w-100 text-left"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "green",
              }}
            >
              <i
                className="bi bi-person"
                style={{ textDecoration: "none", color: "green" }}
              ></i>{" "}
              {dashboard}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/user-dashboard")}
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                User
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/verifier-dashboard")}
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Verifier
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/admin-dashboard")}
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Admins
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
