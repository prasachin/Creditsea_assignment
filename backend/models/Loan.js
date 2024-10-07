const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
    min: [0, "Loan amount must be a positive number"],
  },
  loanTenure: {
    type: Number,
    required: true,
    min: [1, "Loan tenure must be at least 1 month"],
  },
  employmentStatus: {
    type: String,
    required: true,
  },
  reasonForLoan: {
    type: String,
    required: true,
  },
  employmentAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Loan = mongoose.model("Loan", loanApplicationSchema);

module.exports = Loan;
