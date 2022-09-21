const router = require("express").Router();
const User = require("../model/User");
const bycrypt = require("bcrypt");

const checkEmail = async (req, res) => {
  try {
    // check exsting user
    const exstingMail = await User.findOne({ email: req.body.email });
    const exstingName = await User.findOne({ username: req.body.name });
    if (exstingMail) {
      res.status(400).json("emailExist");
    } else if (exstingName) {
      console.log("exist name");
      res.status(400).json("nameExist");
    } else {
      res.status(200).json("noUser");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// register
const register = async (req, res) => {
  try {
    // Generate new password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    // create new user
    const newUser = await new User({
      username: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // save user and respond
    const user = await newUser.save();
    console.log("reg sucess");
    res.status(200).json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log("register error");
    res.status(500).json(err);
  }
};

// Login user
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const validPassword = await bycrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json("Wrong password");
    }
    res.status(200).json({
      admin: user.isAdmin,
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log(err);
  }
};
// forgottPassword
const forgottPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not Found!");
    }
    const salt = await bycrypt.genSalt(10);
    const password = await bycrypt.hash(req.body.password, salt);
    const forgottPassword = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: password } }
    );
    const SaveUser = await forgottPassword.save();
    // console.log(SaveUser);
    res.status(200).json("updated password");
  } catch (error) {
    console.log(error);
  }
};

const checkPhoneNum = async (req, res) => {
  try {
    // check exsting user
    const exstingPhone = await User.findOne({ phone: req.body.phone });
    if (exstingPhone) {
      res.status(200).json("phoneConfirmed");
    } else {
      console.log("no phone matched");
      res.status(400).json("noPhone");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// logout the user
const logout = async (req, res) => {
  try {
    res.status(200).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
module.exports = {
  register,
  login,
  checkEmail,
  checkPhoneNum,
  logout,
  forgottPassword,
};
