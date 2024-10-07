import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import "./verify.css";
const Verifier = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/applications"
      );
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(`http://localhost:3003/api/applications/${loanId}`, {
        status: newStatus,
      });
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId ? { ...loan, status: newStatus } : loan
        )
      );
      setShowDropdown(false);
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  const toggleDropdown = (loanId) => {
    setSelectedLoan(loanId);
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div className="admin-dashboard">
      <h6>Dashboard: LOANS</h6>
      <div className="dashboard-statistics">
        <span>
          <h2>200</h2>
          <p>Active Users</p>
        </span>
        <span>
          <h2>100</h2>
          <p>Borrowers</p>
        </span>
        <span>
          <h2>550,000</h2>
          <p>Cash Distributed</p>
        </span>
        <span>
          <h2>1,000,000</h2>
          <p>Cash Received</p>
        </span>
        <div className="statistic">
          <h2>450,000</h2>
          <p>Savings</p>
        </div>
        <div className="statistic">
          <h2>30</h2>
          <p>Repaid Loans</p>
        </div>
        <div className="statistic">
          <h2>10</h2>
          <p>Other Accounts</p>
        </div>
        <div className="statistic">
          <h2>50</h2>
          <p>Loans</p>
        </div>
      </div>
      ;
      <div className="recent-loans table-responsive mt-5">
        <h2>Applied Loans</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User Recent Activity</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan._id}>
                  <td>
                    <img
                      src={
                        "https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98399.jpg?w=826"
                      }
                      alt="User"
                      className="rounded-circle"
                      width="30"
                    />
                    <span>
                      {" Applied for "}
                      {loan.reasonForLoan}
                      {" Loan"}
                    </span>
                  </td>
                  <td>{loan.fullName}</td>
                  <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        loan.status === "Approved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {loan.status}
                    </span>
                    <span
                      className="dropdown-icon"
                      onClick={() => toggleDropdown(loan._id)}
                    >
                      <FaEllipsisV />
                    </span>
                    {showDropdown && selectedLoan === loan._id && (
                      <div className="dropdown-menu">
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleStatusChange(loan._id, "Approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleStatusChange(loan._id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            handleStatusChange(loan._id, "Pending")
                          }
                        >
                          Pending
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Verifier;
