const express = require("express");
const mongoose = require("mongoose");
const resturantRouter = require("./routes/RestaurantRoutes");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://harshpatelhp7:DOGEtomoon2021@comp3123.h9dis.mongodb.net/comp3123?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(resturantRouter);
app.listen(8082, () => {
  console.log(`Port listening at http://localhost:8082/`);
});
