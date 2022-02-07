const e = require("express");
const express = require("express");
const restaurantModel = require("../model/Restaurant");
const app = express();

app.get("/restaurants", async (req, res) => {
  const restaurants = await restaurantModel.find({});

  try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/restaurant", async (req, res) => {
  const restaurant = new restaurantModel(req.body);

  try {
    await restaurant.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(restaurant);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/restaurants", async (req, res) => {
  let restaurants = [];
  restaurants = req.body;
  try {
    console.log(typeof restaurants);
    await restaurantModel.insertMany(restaurants);
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/restaurants/cuisine/:value", async (req, res) => {
  console.log(req.params.value);
  const restaurants = await restaurantModel.find({ cuisine: req.params.value });
  console.log(restaurants);

  try {
    if (restaurants.length !== 0) {
      res.send(restaurants);
    } else {
      res.send("No data found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/restaurants/:value", async (req, res) => {
  const sorting = req.params.value;
  console.log(sorting);
  if (sorting == "ASC") {
    let restaurants = await restaurantModel
      .find({}, "cusisine", "restaurant_id", "name", "city", "_id")
      .sort({ restaurant_id: 1 });

    try {
      if (restaurants.length != 0) {
        res.status(200).send(restaurants);
      } else {
        res.status(404).send("No data found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else if (sorting == "DESC") {
    let restaurants = await restaurantModel
      .find({}, "cusisine", "restaurant_id", "name", "city", "_id")
      .sort({ restaurant_id: -1 });

    try {
      if (restaurants.length != 0) {
        res.status(200).send(restaurants);
      } else {
        res.status(404).send("No data found");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = app;
