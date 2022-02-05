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

module.exports = app;
