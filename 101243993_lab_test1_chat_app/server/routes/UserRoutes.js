const UserModel = require("../model/user");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello This is Home.");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.status(200);
  next();
});

//GET all users
app.get("/users", async (req, res) => {
  const users = await UserModel.find({});

  try {
    res.status(200).send({ description: "All Users are fetched: ", users });
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST a NEW user
app.post("/users", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.status(201).send({ description: "A new User is created.", user });
  } catch (err) {
    console.log("ERROR: " + err);
    res.status(500).send(err);
  }
});

//GET user by username
app.get("/users/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.find({ username: username });

    if (user.length === 0) {
      res.status(404).send("No item found");
    } else {
      res
        .status(200)
        .send({ description: "One user resource is fetched", user });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE user by id
app.put("/user/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user === null || user === undefined) {
      res.status(404).send("No item found");
    } else {
      res.status(200).send({ description: "User resource is updated", user });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send("No item found");
    } else {
      res.send({ description: "User resource is deleted", user });
      res.status(200);
    }
  } catch (err) {
    res.status(500).send("No Item Found");
  }
});

module.exports = app;
