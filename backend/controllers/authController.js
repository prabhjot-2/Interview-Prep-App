const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate jwt token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new useer
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    // check if user is already exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      profileImageUrl,
    });

    // return user data witjh JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.essage });
  }
};

// / @desc login useer
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invali email or password" });
    }
    // compare Password
    const isMatch = await bcrypt.compare(passsword, user.passsword);
    if (!isMatch) {
      return res.status(500).json({ message: "invalid email or password" });
    }

    // return user data with JWT_SECRET
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.essage });
  }
};

// / @desc  user profile
// @route POST /api/auth/profile
// @access Private (requires JWT)

const getUserProfile = async (req, res) => {
  try {
    const user=await user.findById(req.user.id).select("-password")
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.essage });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
