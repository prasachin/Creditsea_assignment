import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);

  const handleDepositSubmit = async (event) => {
    event.preventDefault();

    if (depositAmount <= 0) {
      setMessage("Please enter a valid deposit amount.");
      return;
    }

    if (!userId) {
      setMessage("User not logged in. Please login first.");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3003/api/deposit", {
        userId: userId,
        depositAmount: parseFloat(depositAmount),
      });

      if (response.status === 200) {
        setMessage("Deposited successfully !");
        setTimeout(() => setMessage(null), 2000);
        setDepositAmount("");
      } else {
        setMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error during deposit:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <h2 className="my-4">Deposit Cash</h2>

      <form onSubmit={handleDepositSubmit}>
        <div className="mb-3">
          <label htmlFor="depositAmount" className="form-label">
            Deposit Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="depositAmount"
            placeholder="Enter deposit amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Deposit
        </button>
      </form>
    </div>
  );
};

export default Deposit;
