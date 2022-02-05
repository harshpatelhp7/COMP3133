const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: Number,
      required: [true, "Please enter building number"],
    },
    street: { type: String, required: [true, "Please enter street"] },
    zipcode: { type: Number, required: [true, "Please enter zip"] },
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  cuisine: { type: String, required: [true, "Please enter cuisine"] },
  name: { type: String, required: [true, "Please enter name"] },
  restaurant_id: {
    type: String,
    unique: [true, "id is already taken."],
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
