const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    if (!transactions) {
      return res.status(404).json({ message: "No transactions found." });
    }

    res.json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
