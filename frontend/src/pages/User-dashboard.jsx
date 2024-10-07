import React, { useState } from "react";
import Loanform from "./Loanform";
import { Modal, Button } from "react-bootstrap";

const User = () => {
  const [showModal, setShowModal] = useState(false);

  const handleloan = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
                <button className="btn btn-success" onClick={handleloan}>
                  Get A Loan
                </button>
              </div>
            </div>
            <div className="btn-group mt-3">
              <button className="btn btn-outline-secondary">Borrow Cash</button>
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
                <tr>
                  <td>
                    <img
                      src="/path/to/officer1.jpg"
                      width="30"
                      className="rounded-circle mr-2"
                      alt="Loan Officer"
                    />
                    John Okoh
                  </td>
                  <td>₦ 50,000.00</td>
                  <td>June 09, 2021</td>
                  <td>
                    <span className="badge badge-warning">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="/path/to/officer2.jpg"
                      width="30"
                      className="rounded-circle mr-2"
                      alt="Loan Officer"
                    />
                    John Okoh
                  </td>
                  <td>₦ 100,000.00</td>
                  <td>June 07, 2021</td>
                  <td>
                    <span className="badge badge-success">Verified</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="/path/to/officer3.jpg"
                      width="30"
                      className="rounded-circle mr-2"
                      alt="Loan Officer"
                    />
                    John Okoh
                  </td>
                  <td>₦ 100,000.00</td>
                  <td>June 07, 2021</td>
                  <td>
                    <span className="badge badge-danger">Rejected</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img
                      src="/path/to/officer4.jpg"
                      width="30"
                      className="rounded-circle mr-2"
                      alt="Loan Officer"
                    />
                    John Okoh
                  </td>
                  <td>₦ 100,000.00</td>
                  <td>May 27, 2021</td>
                  <td>
                    <span className="badge badge-primary">Approved</span>
                  </td>
                </tr>
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
