const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: Number,
    },
    street: { type: String },
    zipcode: { type: Number },
  },
  city: {
    type: String,
  },
  cuisine: { type: String },
  name: { type: String },
  restaurant_id: {
    type: String,
    unique: [true, "id is already taken."],
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
