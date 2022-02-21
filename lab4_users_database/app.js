const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./routes/UserRoutes");

app.use(express.json);

mongoose.connect(
  "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(userRoutes);

app.listen(8081, () => {
  console.log("Server running.....");
});
