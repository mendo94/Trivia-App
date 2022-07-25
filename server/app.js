const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const models = require("./models");
const { Op } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];
// const authenticate = require("./authenticateMiddleware");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const cors = require("cors");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

// const users = [
//   { username: "johndoe", password: 1234 },
//   { username: "janedoe", password: 1234 },
// ];

app.post("/registration", async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  const persistedUser = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (persistedUser) {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = models.User.build({
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: hash,
    });
    const _ = await user.save();
    res.json({ success: true });
  }
});

app.get("/registration", async (req, res) => {
  const users = await models.User.findAll();
  res.json(users);
});

app.get("/registration", async (req, res) => {
  const users = await models.User.findAll();
  res.json(users);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ username: user.username }, "SECRETKEY");
        res.json({ success: true, token: token });
      } else {
        res.json({ success: false, message: "User is not authenticated." });
      }
    });
  } else {
    res.json({ success: false, message: "Authentication failed." });
  }
});

app.get("/login", async (req, res) => {
  const users = await models.User.findOne();
  res.json(users);
});

app.get("/profile", (req, res) => {
  const headers = req.headers;
  console.log(headers);
  const { username } = req.body;
  const userProfile = profile.filter((account) => account.username == username);
  res.json();
});
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
// });

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
