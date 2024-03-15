const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const pid = req.params.pid;

    const product = await Product.findById(pid);

    const user = await User.findById(req.userId);

    if (user.role !== "buyer") {
      return res
        .status(401)
        .json({ errorMessage: "Only buyers can add to cart" });
    }

    const existingCart = await Cart.findOne({ user: req.userId });

    let cart;

    if (existingCart) {
      const carted = await Cart.findOne({
        user: req.userId,
        products: pid,
      });
      if (carted) {
        return res.status(403).json({ errorMessage: carted });
      }

      existingCart.products.push(product);
      cart = await existingCart.save();
    } else {
      const newCart = new Cart({
        user: req.userId,
        products: [product],
      });

      cart = await newCart.save();
    }

    return res.json({ cart: cart });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const removeFromCart = async (req, res) => {
  try {
    const pid = req.params.pid;

    const product = await Product.findById(pid);
    const cart = await Cart.findOne({ user: req.userId });

    cart.products.pull(product);

    const newCart = await cart.save();

    res.json(newCart);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("products");

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.addToCart = addToCart;
exports.getCart = getCart;
exports.removeFromCart = removeFromCart;
