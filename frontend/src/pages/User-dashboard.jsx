import React, { useState, useEffect } from "react";
import Loanform from "./Loanform";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";
import Deposit from "./depositform";
import Transactions from "./Transactions";

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppliedLoans();
  }, []);

  const fetchAppliedLoans = async () => {
    try {
      const response = await axios.get("/api/applications");
      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error("Error fetching applied loans:", error);
    }
  };

  const handleLoan = () => {
    setShowModal(true);
  };
  const handledeposit = () => {
    setShowModal1(true);
  };
  const handledtransaction = () => {
    setShowModal2(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const closeModal1 = () => {
    setShowModal1(false);
  };
  const closeModal2 = () => {
    setShowModal2(false);
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
            <h2 style={{ color: "black", fontWeight: "bold" }}>Loan Details</h2>
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
              <button
                className="btn btn-outline-secondary"
                onClick={handledtransaction}
              >
                Transactions
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handledeposit}
              >
                Deposit Cash
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-12">
            <h4 style={{ color: "black", fontWeight: "bold" }}>
              Applied Loans
            </h4>
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
                          src="https://res.cloudinary.com/dbduadsbd/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1709183359/samples/people/smiling-man.jpg"
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

      <Modal show={showModal1} onHide={closeModal1} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Deposit Cash</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <Deposit />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={closeModal2} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Transaction History For You !</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}
        >
          <Transactions />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default User;
