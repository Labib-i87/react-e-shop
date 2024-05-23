const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

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
// app.use(express.json()); // for all
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/public/images", express.static(path.join("public", "images")));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/auth", require("./routers/userRouter"));
app.use("/product", require("./routers/productRouter"));
app.use("/cart", require("./routers/cartRouter"));
app.use("/purchaseHistory", require("./routers/purchaseHistoryRouter"));
