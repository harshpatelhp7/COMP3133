const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter User Name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    trim: true,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
