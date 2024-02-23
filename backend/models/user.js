const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true, minlength: 6 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
