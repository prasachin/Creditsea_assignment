import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import "./verify.css";
import { Dropdown } from "react-bootstrap";

const Verifier = () => {
  const [loans, setLoans] = useState([]);
  const [statistics, setStatistics] = useState({
    totalLoans: 0,
    borrowers: 0,
    cashDisbursed: 0,
    savings: 0,
    repaidLoans: 0,
    cashReceived: 0,
    otherAccounts: 10,
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("/api/applications");
      const fetchedLoans = response.data;
      setLoans(fetchedLoans);
      updateStatistics(fetchedLoans);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const updateStatistics = (loans) => {
    if (!loans) return;

    const totalLoans = loans.length;
    const borrowers = loans.filter((loan) => loan.status !== "pending").length;
    const cashDisbursed = loans.reduce(
      (total, loan) => total + loan.loanAmount,
      0
    );
    const repaidLoans = loans.filter((loan) => loan.status === "Repaid").length;
    const cashReceived = loans
      .filter((loan) => loan.status === "Approved")
      .reduce((total, loan) => total + loan.loanAmount, 0);
    const savings = cashDisbursed - cashReceived;

    setStatistics({
      totalLoans,
      borrowers,
      cashDisbursed,
      repaidLoans,
      cashReceived,
      savings,
      otherAccounts: 10,
    });
  };

  const handleStatusChange = async (loanId, newStatus) => {
    try {
      await axios.put(`/api/applications/${loanId}`, {
        status: newStatus,
      });
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === loanId ? { ...loan, status: newStatus } : loan
        )
      );
      fetchLoans();
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h6 style={{ color: "green", fontWeight: "bold" }}>Dashboard: LOANS</h6>
      <div className="dashboard-statistics">
        <span>
          <i class="bi bi-wallet-fill fa-2x"></i>
          <h2>{statistics.totalLoans}</h2>
          <p>Loans</p>
        </span>
        <span>
          <i class="bi bi-person-dash-fill fa-2x"></i>
          <h2>{statistics.borrowers}</h2>
          <p>Borrowers</p>
        </span>
        <span>
          <i class="bi bi-cash-stack fa-2x"></i>
          <h2>{statistics.cashDisbursed}</h2>
          <p>Cash Disbursed</p>
        </span>
        <span>
        <i class="bi bi-piggy-bank-fill fa-2x"></i>
          <h2>{statistics.savings}</h2>
          <p>Savings</p>
        </span>
        <div className="statistic">
          <i class="bi bi-person-check-fill fa-2x"></i>
          <h2>{statistics.repaidLoans}</h2>
          <p>Repaid Loans</p>
        </div>
        <div className="statistic">
          <i class="bi bi-currency-rupee fa-2x"></i>
          <h2>{statistics.cashReceived}</h2>
          <p>Cash Received</p>
        </div>
        <div className="statistic">
          <i class="bi bi-bank2 fa-2x"></i>
          <h2>{statistics.otherAccounts}</h2>
          <p>Other Accounts</p>
        </div>
        <div className="statistic">
          <i class="bi bi-piggy-bank-fill fa-2x"></i>
          <h2>{statistics.otherAccounts}</h2>
          <p>Savivgs Accounts</p>
        </div>
      </div>

      <div className="recent-loans table-responsive mt-5">
        <h2 style={{ color: "black", fontWeight: "bold" }}>Applied Loans</h2>
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
                      src="\smiling-man-Circle.jpg"
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
                          : loan.status === "Rejected"
                          ? "badge-danger"
                          : "badge-warning"
                      }`}
                    >
                      {loan.status}
                    </span>
                    <Dropdown align="end">
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
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(loan._id, "Approved")
                          }
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(loan._id, "Rejected")
                          }
                        >
                          Reject
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(loan._id, "Pending")
                          }
                        >
                          Set to Pending
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
