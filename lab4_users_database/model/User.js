const mongoose = require("mongoose");
const { isEmail, isURL } = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  username: {
    type: String,
    validate: function (v) {
      if (v < 4) {
        throw new Error("Username must be atleast 4 characters long");
      }
    },
    trim: true,
    required: [true, "UserName is required"],
  },
  email: {
    type: String,
    trim: true,
    validate: [isEmail, "Please enter a valid email"],
    required: [true, "Email is required"],
  },
  address: {
    street: {
      type: String,
      required: [true, "street is required"],
      trim: true,
    },
    suite: {
      type: String,
      trim: true,
      required: [true, "suite number is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "city name is required"],
      validate: function (v) {
        if (/\d/.test(v)) {
          throw new Error("City name should contain only alphabets");
        }
      },
    },
    zipcode: {
      type: String,
      required: [true, "zipcode is required"],
      validate: function (v) {
        return /^[0-9]{5}(?:-[0-9]{4})?$/;
      },
    },
    geo: {
      lat: { type: String, required: [true, "latitude is required"] },
      lng: { type: String, required: [true, "longitude is required"] },
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      validate: function (v) {
        return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
      },
    },
    website: {
      type: String,
      required: [true, "website url is required"],
      validate: [isURL, "Please enter a valid website URL"],
    },
    company: {
      name: {
        type: String,
        required: [true, "Company name is required"],
      },
      catchPhrase: {
        type: String,
        required: [true, "Comapny cathPhrase is required"],
      },
      bs: {
        type: String,
        required: [true, "Company bs is required"],
      },
    },
  },
});

UserSchema.post("init", (doc) => {
  console.log("%s has been initialized from the db", doc._id);
});

UserSchema.post("validate", (doc) => {
  console.log("%s has been validated (but not saved yet)", doc._id);
});

UserSchema.post("save", (doc) => {
  console.log("%s has been saved", doc._id);
});

UserSchema.post("remove", (doc) => {
  console.log("%s has been removed", doc._id);
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
