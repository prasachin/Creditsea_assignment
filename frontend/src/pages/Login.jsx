import React, { useState } from "react";
import { FaAt, FaLock } from "react-icons/fa";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = ({ loginUrl }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Email and Password are required");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    try {
      const response = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage("Successfully LoggedIn !");
      setTimeout(() => setMessage(null), 4000);
      setTimeout(() => navigate("/user-dashboard"), 4000);
    } catch (error) {
      setMessage("Invalid credentials. Please try again.");
      setTimeout(() => setMessage(null), 4000);
      console.error("Login error: ", error.message);
    }
  };

  return (
    <div className="center-wrap">
      {message && <Alert variant="primary">{message}</Alert>}
      <div className="section text-center">
        <h4 className="mb-4 pb-3" style={{ color: "black" }}>
          Log In
        </h4>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              name="logemail"
              className="form-style"
              placeholder="Your Email"
              id="logemail"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="input-icon">
              <FaAt />
            </i>
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="logpass"
              className="form-style"
              placeholder="Your Password"
              id="logpass"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="input-icon">
              <FaLock />
            </i>
          </div>
          <button type="submit" className="btn mt-4">
            Submit
          </button>
        </form>
        <p className="mb-0 mt-4 text-center">
          <a href="#0" className="link">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
