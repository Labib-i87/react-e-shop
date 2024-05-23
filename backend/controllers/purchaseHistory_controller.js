const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");
const PurchaseHistory = require("../models/purchaseHistory");

const mongoose = require("mongoose");

const updatePurchaseHistory = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const existingPurchaseHistory = await PurchaseHistory.findOne({
      user: req.userId,
    });

    let purchaseHistory;

    if (existingPurchaseHistory) {
      existingPurchaseHistory.history.push(req.body);
      purchaseHistory = await existingPurchaseHistory.save();
    } else {
      const newPurchaseHistory = new PurchaseHistory({
        user: req.userId,
        history: [req.body],
      });

      purchaseHistory = await newPurchaseHistory.save();
    }

    const cart = await Cart.findOne({ user: req.userId });

    if (cart) {
      cart.products = [];
      await cart.save();
    }

    return res.json({ purchaseHistory: purchaseHistory });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.updatePurchaseHistory = updatePurchaseHistory;
