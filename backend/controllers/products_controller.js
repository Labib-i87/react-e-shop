const Product = require("../models/product");
const User = require("../models/user");

const mongoose = require("mongoose");

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

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductsByUserId = getProductsByUserId;
exports.getProductById = getProductById;
