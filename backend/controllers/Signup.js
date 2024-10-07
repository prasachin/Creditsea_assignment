const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const CreditAppUser = require("../models/CreditAppUser");

usersRouter.post("/signup", async (request, response) => {
  const { name, email, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: "Password is required" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new CreditAppUser({
    name,
    email,
    password: passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response
      .status(400)
      .json({ error: "Error saving user", details: error.message });
  }
});

usersRouter.get("/", async (request, response) => {
  try {
    const users = await CreditAppUser.find({});
    response.json(users);
  } catch (error) {
    response.status(400).json({ error: "Error fetching users" });
  }
});

module.exports = usersRouter;
