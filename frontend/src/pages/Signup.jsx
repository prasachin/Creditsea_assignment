import React, { useState } from "react";
import { FaAt, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SignUp = ({ signurl }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Email and Password are required");
      setTimeout(() => setMessage(null), 2000);
      return;
    }
    try {
      await axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      setMessage(`${name} signed up. Login !`);
      setTimeout(() => {
        setMessage(null);
        navigate("/home");
      }, 4000);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(
        "Can't sign up check email format and password min length 5: "
      );
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="center-wrap">
      <div className="section text-center">
        {message && (
          <>
            <Alert variant="success">{message}</Alert>
            <script>
              {window.scrollTo({
                top: 0,
                behavior: "smooth",
              })}
            </script>
          </>
        )}
        <h4 className="mb-4 pb-3" style={{ color: "black" }}>
          Sign Up
        </h4>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-style"
              placeholder="Your Full Name"
              id="logname"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <i className="input-icon">
              <FaUser />
            </i>
          </div>
          <div className="form-group mt-2">
            <input
              type="email"
              name="email"
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
              name="password"
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
      </div>
    </div>
  );
};

export default SignUp;
