const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  history: [
    {
      date: { type: Date, default: Date.now, required: true },
      products: [
        { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
      ],
      paymentMethod: {
        type: String,
        required: true,
        enum: ["bkash", "nagad", "rocket"],
      },
      status: {
        type: String,
        required: true,
        enum: ["pending", "processing", "delivered"],
      },
    },
  ],
});

const PurchaseHistory = mongoose.model(
  "PurchaseHistory",
  purchaseHistorySchema
);
module.exports = PurchaseHistory;
