import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleDropdownSelect = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>CREDIT APP</h2>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/home">
            <i className="bi bi-house"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/payments">
            <i className="bi bi-cash-stack"></i> Payments
          </Link>
        </li>
        <li>
          <Link to="/budget">
            <i className="bi bi-journal-text"></i> Budget
          </Link>
        </li>
        <li>
          <Link to="/card">
            <i className="bi bi-credit-card"></i> Card
          </Link>
        </li>
      </ul>
      <ul className="navbar-icons">
        <li>
          <Link to="/notifications">
            <i className="bi bi-bell"></i>
            <span className="notification-badge">4</span>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <i className="bi bi-chat-dots"></i>
          </Link>
        </li>
        <li>
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="user-dropdown-offcanvas"
              className="w-100 text-left"
            >
              <i
                className="bi bi-person"
                style={{ textDecoration: "none" }}
              ></i>{" "}
              User
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/user-dashboard")}
              >
                User
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/verifier-dashboard")}
              >
                Verifier
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleDropdownSelect("/admin-dashboard")}
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
