const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const CreditAppUser = require("../models/CreditAppUser");

const secret = "bearer";

loginRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    console.log(request.body);
    const user = await CreditAppUser.findOne({ email });
    // console.log(user);
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    // console.log(passwordCorrect);
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "Invalid email or password",
      });
    }

    const userForToken = {
      email: user.email,
      name: user.name,
    };
    // console.log(secret);
    const token = jwt.sign(userForToken, secret);
    // console.log(token);
    response.status(200).send({ token, id: user._id });
  } catch (error) {
    response.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = loginRouter;
