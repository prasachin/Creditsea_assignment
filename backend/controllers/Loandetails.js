const loanrouter = require("express").Router();
const Loan = require("../models/Loan");

loanrouter.post("/apply", async (request, response) => {
  const {
    fullName,
    loanAmount,
    loanTenure,
    employmentStatus,
    reasonForLoan,
    employmentAddress,
  } = request.body;

  const newapplicants = new Loan({
    fullName,
    loanAmount,
    loanTenure,
    employmentStatus,
    reasonForLoan,
    employmentAddress,
  });

  try {
    const savedapplication = await newapplicants.save();
    response.status(200).json(savedapplication);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving application", details: error.message });
  }
});

loanrouter.get("/", async (request, response) => {
  try {
    const applications = await Loan.find({});
    response.json(applications);
  } catch (error) {
    response.status(400).json({ error: "Error fetching users" });
  }
});

module.exports = loanrouter;
