const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const usersRouter = require("./controllers/Signup");
const loginRouter = require("./controllers/Login");
const loanrouter = require("./controllers/Loandetails");
const cors = require("cors");

const mongoDB = require("./db");
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use("/api/users", usersRouter);
app.use("/api/users", loginRouter);
app.use("/api/applications", loanrouter);

const port = process.env.PORT || 5000;

mongoDB();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
