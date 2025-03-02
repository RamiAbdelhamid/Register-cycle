const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SECRET_KEY } = require("../middlewares/auth");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ message: "Server error registering user" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, is_deleted: false } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error logging in" });
  }
}

async function userProfile(req, res) {
  try {
    const user = await User.findOne({
      where: { email: req.user.email, is_deleted: false },
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error fetching profile" });
  }
}

function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}




module.exports = { register, login, userProfile, logout};
