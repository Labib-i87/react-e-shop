const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, email, password, passwordVerify, role } = req.body;

    if (!username || !email || !password || !passwordVerify || !role) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({ errorMessage: "Password doesn't match." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this email exists.",
      });
    }

    // hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // save new user to the DB

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      products: [],
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = jwt.sign(
      {
        username: savedUser.username,
        userId: savedUser._id,
        role: savedUser.role,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!verifyPassword)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    // sign the token

    const token = jwt.sign(
      {
        username: existingUser.username,
        userId: existingUser._id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};

const isLoggedIn = (req, res) => {
  const nonVerifiedData = {
    verified: false,
    username: null,
    userId: null,
    role: null,
  };

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(nonVerifiedData);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedData = {
      verified: true,
      username: verifiedToken.username,
      userId: verifiedToken.userId,
      role: verifiedToken.role,
    };

    res.send(verifiedData);
  } catch (err) {
    res.json(nonVerifiedData);
  }
};

exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.isLoggedIn = isLoggedIn;
