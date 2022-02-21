const express = require("express");
const UserModel = require("../model/User");
const app = express();

app.get("/", async (req, res) => {
  res.send("Welcome");
});

app.get("/users", async (req, res) => {
  const users = await UserModel.find({});

  try {
    res.status(200).send({ description: "All Users are fetched: ", users });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/users", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save(); 
    res.send(200, `User created ${user}`);
  } catch (err) {
    res.send(500, err);
  }
});

module.exports = app;
