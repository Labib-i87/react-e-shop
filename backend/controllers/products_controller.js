const Product = require("../models/product");
const User = require("../models/user");
const fs = require("fs");

const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getProductById = async (req, res) => {
  const pid = req.params.pid;

  let product;

  try {
    product = await Product.findById(pid);
    res.json({
      product: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getProductsByUserId = async (req, res) => {
  const userId = req.params.userId;

  let userWithProducts;

  try {
    userWithProducts = await User.findById(userId).populate("products");

    res.json({
      products: userWithProducts.products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      imageUrl: req.file.path,
      creator: req.userId,
    });

    const user = await User.findById(req.userId);

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newProduct.save({ session: sess });
    user.products.push(newProduct);
    await user.save({ session: sess });
    await sess.commitTransaction();

    res.json({ product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const pid = req.params.pid;

    const product = await Product.findById(pid);

    if (product.creator.toString() !== req.userId) {
      res.json({ message: "You are not allowed to edit this product." });
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;

    const product = await Product.findById(pid).populate("creator");

    if (product.creator.id !== req.userId) {
      res.json({ message: "You are not allowed to edit this product." });
    }

    const imagePath = product.imageUrl;

    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.deleteOne({ session: sess });
    product.creator.products.pull(product);
    await product.creator.save({ session: sess });
    await sess.commitTransaction();

    fs.unlink(imagePath, (err) => {
      console.error(err);
    });
    res.status(200).json({ message: "Product Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductsByUserId = getProductsByUserId;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
