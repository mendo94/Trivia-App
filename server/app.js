const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const models = require("./models");
const { Op } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.js")[env];

const users = [
  { username: "johndoe", password: 1234 },
  { username: "janedoe", password: 1234 },
];

app.get("/login", (req, res) => {
  res.send("Site is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
