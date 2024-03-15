const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Product",
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
