import React, { useState, useEffect } from "react";
import "./Loanform.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Loanform = () => {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress: "",
    userId: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
      //   console.log(decodedToken);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to apply for a loan.");
      return;
    }

    const applicationData = {
      ...formData,
      userId,
    };

    try {
      const response = await axios.post(
        "/api/applications/apply",
        applicationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Loan application submitted successfully!");
        setFormData({
          fullName: "",
          loanAmount: "",
          loanTenure: "",
          employmentStatus: "",
          reasonForLoan: "",
          employmentAddress: "",
        });
      } else {
        alert(`Failed to submit: ${response.data.error}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content loan-form">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">
            APPLY FOR A LOAN
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handlesubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Full name as it appears on bank account</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full name as it appears on bank account"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>How much do you need?</label>
                <input
                  type="number"
                  className="form-control"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder="How much do you need?"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Loan tenure (in months)</label>
                <input
                  type="number"
                  className="form-control"
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleInputChange}
                  placeholder="Loan tenure (in months)"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Employment status</label>
                <input
                  type="text"
                  className="form-control"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  placeholder="Employment status"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Reason for loan</label>
                <input
                  type="text"
                  className="form-control"
                  name="reasonForLoan"
                  value={formData.reasonForLoan}
                  onChange={handleInputChange}
                  placeholder="Reason for loan"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Employment address</label>
                <input
                  type="text"
                  className="form-control"
                  name="employmentAddress"
                  value={formData.employmentAddress}
                  onChange={handleInputChange}
                  placeholder="Employment address"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loanform;
