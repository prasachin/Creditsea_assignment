const mongoose = require("mongoose");

const mongoDB = async () => {
  const mongoURL = process.env.Mongourl;

  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Problem connecting Database");
  }
};

module.exports = mongoDB;
