const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

// set up server
const app = express();
const PORT = process.env.PORT || 5000;

// connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    app.listen(PORT);
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

// set up routes
app.use(express.json()); // for all

app.use("/auth", require("./routers/userRouter"));
