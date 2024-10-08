const CreditAppUser = require("../models/CreditAppUser");
const Transaction = require("./models/Transaction");

const depositCash = async (userId, depositAmount) => {
  try {
    const user = await CreditAppUser.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    user.balance += depositAmount;

    const newTransaction = new Transaction({
      userId: user._id,
      amount: depositAmount,
      transactionType: "deposit",
      description: "Cash deposit",
    });

    await newTransaction.save();

    user.transactions.push(newTransaction._id);

    await user.save();

    return { success: true, user };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

module.exports = { depositCash };
