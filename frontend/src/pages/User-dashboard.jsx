import React, { useState, useEffect } from "react";
import Loanform from "./Loanform";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppliedLoans();
  }, []);

  const fetchAppliedLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/api/applications"
      );
      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error("Error fetching applied loans:", error);
    }
  };

  const handleLoan = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = loans.filter(
      (loan) =>
        loan.fullName.toLowerCase().includes(searchValue) ||
        loan.loanAmount.toString().includes(searchValue) ||
        new Date(loan.createdAt).toLocaleDateString().includes(searchValue) ||
        loan.status.toLowerCase().includes(searchValue)
    );
    setFilteredLoans(filtered);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>Loan Details</h2>
            <div className="card">
              <div className="card-body">
                <h5>Deficit</h5>
                <p className="h1 text-success">₦ 0.0</p>
                <button className="btn btn-success" onClick={handleLoan}>
                  Get A Loan
                </button>
              </div>
            </div>
            <div className="btn-group mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={handleLoan}
              >
                Borrow Cash
              </button>
              <button className="btn btn-outline-secondary">Transact</button>
              <button className="btn btn-outline-secondary">
                Deposit Cash
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <h4>Applied Loans</h4>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search for loans"
              value={searchTerm}
              onChange={handleSearch}
            />
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Loan Officer</th>
                  <th>Amount</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <tr key={loan._id}>
                      <td>
                        <img
                          src="/path/to/officer1.jpg"
                          width="30"
                          className="rounded-circle mr-2"
                          alt="Loan Officer"
                        />
                        {loan.fullName}
                      </td>
                      <td>₦ {loan.loanAmount.toFixed(2)}</td>
                      <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            loan.status === "Approved"
                              ? "badge-primary"
                              : loan.status === "Rejected"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <span>
                        <FaEllipsisV />
                      </span>
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
      </div>

      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Apply for a Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <Loanform />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
