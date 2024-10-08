const loanrouter = require("express").Router();
const Loan = require("../models/Loan");
const Transaction = require("../models/Transaction");

loanrouter.post("/apply", async (request, response) => {
  const {
    fullName,
    loanAmount,
    loanTenure,
    employmentStatus,
    reasonForLoan,
    employmentAddress,
    userId,
  } = request.body;

  const newApplication = new Loan({
    fullName,
    loanAmount,
    loanTenure,
    employmentStatus,
    reasonForLoan,
    employmentAddress,
  });

  try {
    const savedApplication = await newApplication.save();

    const newTransaction = new Transaction({
      userId,
      amount: loanAmount,
      transactionType: "loan",
      description: `Loan applied for ${fullName} of amount ${loanAmount}`,
    });
    await newTransaction.save();

    response.status(200).json(savedApplication);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving application", details: error.message });
  }
});

loanrouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  console.log(id, status);
  if (!status) {
    return response.status(400).json({ error: "Status is required" });
  }

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLoan) {
      return response.status(404).json({ error: "Loan not found" });
    }

    await Transaction.findOneAndUpdate(
      { loanId: id },
      { status: status, updatedAt: Date.now() },
      { new: true }
    );

    response.status(200).json(updatedLoan);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error updating loan status", details: error.message });
  }
});

loanrouter.get("/", async (request, response) => {
  try {
    const applications = await Loan.find({});
    response.json(applications);
  } catch (error) {
    response.status(400).json({ error: "Error fetching applications" });
  }
});

module.exports = loanrouter;
