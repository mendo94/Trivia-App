const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;
const models = require("./models");
const { Op } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];
const authenticate = require("./authenticateMiddleware");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const cors = require("cors");
const bcrypt = require("bcryptjs");

app.use(cors());
app.use(express.json());

app.post("/registration", async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  const persistedUser = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (persistedUser == null) {
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
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET_KEY
        );
        res.json({
          success: true,
          token: token,
          username: user.username,
          userId: user.id,
        });
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

app.get("/homepage", authenticate, (req, res) => {
  res.json("good");
});

app.post("/rankings/:userId", async (req, res) => {
  const { points, rank } = req.body;
  const { userId } = req.params;

  try {
    const addPoints = await models.Score.update(
      {
        points: points,
        rank: rank,
      },
      {
        where: {
          userId: userId,
        },
      }
    );

    res.json({ success: true, message: "points have been added." });
  } catch {
    res.json({
      success: false,
      message: "Points could not be added at this time.",
    });
  }
});

app.get("/rankings", async (req, res) => {
  const score = await models.User.findAll({
    include: [{ model: models.Score, as: "points" }],
  });
  res.json(score);
});

app.get("/trivia/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;

  try {
    const score = await models.Score.findAll({
      where: {
        userId: userId,
      },
    });
    res.json(score);
  } catch {
    res.json({
      success: false,
      message: "You must be logged in to save your score.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
