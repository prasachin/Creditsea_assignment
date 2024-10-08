import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import "./admin.css";

const Admin = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState({
    activeUsers: 0,
    borrowers: 0,
    cashDisbursed: 0,
    cashReceived: 0,
    savings: 0,
    repaidLoans: 0,
    otherAccounts: 0,
    totalLoans: 0,
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const loanResponse = await axios.get(
        "http://localhost:3003/api/applications"
      );
      const fetchedLoans = loanResponse.data;
      setLoans(fetchedLoans);
      const fetchedUsers = await fetchUsers();
      updateStatistics(fetchedLoans, fetchedUsers);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3003/api/users");
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateStatistics = (loans, users) => {
    const activeUsers = users.length;
    const borrowers = loans.filter((loan) => loan.status !== "pending").length;
    const cashDisbursed = loans.reduce(
      (total, loan) => total + loan.loanAmount,
      0
    );
    const cashReceived = loans
      .filter((loan) => loan.status === "Approved")
      .reduce((total, loan) => total + loan.loanAmount, 0);
    const repaidLoans = loans.filter((loan) => loan.status === "Repaid").length;
    const totalLoans = loans.length;
    const savings = cashDisbursed - cashReceived;
    const otherAccounts = 10;

    setStatistics({
      activeUsers,
      borrowers,
      cashDisbursed,
      cashReceived,
      savings,
      repaidLoans,
      otherAccounts,
      totalLoans,
    });
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
      fetchLoans();
    } catch (error) {
      console.error("Error updating loan status:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h6 style={{ color: "black", fontWeight: "bold" }}>DASHBOARD</h6>
      <div className="dashboard-statistics">
        <span>
          <h2>{statistics.activeUsers}</h2>
          <p>Active Users</p>
        </span>
        <span>
          <h2>{statistics.borrowers}</h2>
          <p>Borrowers</p>
        </span>
        <span>
          <h2>{statistics.cashDisbursed}</h2>
          <p>Cash Disbursed</p>
        </span>
        <span>
          <h2>{statistics.cashReceived}</h2>
          <p>Cash Received</p>
        </span>
        <div className="statistic">
          <h2>{statistics.savings}</h2>
          <p>Savings</p>
        </div>
        <div className="statistic">
          <h2>{statistics.repaidLoans}</h2>
          <p>Repaid Loans</p>
        </div>
        <div className="statistic">
          <h2>{statistics.otherAccounts}</h2>
          <p>Other Accounts</p>
        </div>
        <div className="statistic">
          <h2>{statistics.totalLoans}</h2>
          <p>Loans</p>
        </div>
      </div>

      <div className="recent-loans table-responsive mt-5">
        <h2 style={{ color: "black", fontWeight: "bold" }}>Recent Loans</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User Details</th>
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
                      src="https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98399.jpg?w=826"
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
                  <td className="text-right">
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

export default Admin;
