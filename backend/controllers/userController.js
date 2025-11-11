//route for user login
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Wrong Email Format" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Password should be at least 8 characters long",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: "User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, msg: "Email or Password is wrong." });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//route for user registeration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, msg: "User Already Exists" });
    }
    //validating email format & strong password.
    if (!validator.isEmail(email)) {
      return res.json({ success: false, msg: "Wrong Email Format" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        msg: "Password should be atleast 8 characters long",
      });
    }

    //hashing userpassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

//route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, msg: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
