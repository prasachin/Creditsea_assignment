const express = require("express");
const depositrouter = express.Router();
const CreditAppUser = require("../models/CreditAppUser");
const Transaction = require("../models/Transaction");

depositrouter.post("/deposit", async (req, res) => {
  const { depositAmount, userId } = req.body;

  if (!depositAmount || depositAmount <= 0) {
    return res.status(400).json({ error: "Invalid deposit amount." });
  }

  try {
    const user = await CreditAppUser.findByIdAndUpdate(
      userId,
      { $inc: { balance: depositAmount } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const transaction = new Transaction({
      userId: user._id,
      amount: depositAmount,
      transactionType: "deposit",
      description: "Cash Deposit ",
    });

    await transaction.save();

    res.status(200).json({ message: "Deposited successful!", user });
  } catch (error) {
    console.error("Error processing deposit:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the deposit." });
  }
});

module.exports = depositrouter;
