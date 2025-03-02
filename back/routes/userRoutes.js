const express = require("express");
const {
  register,
  login,
  userProfile,
  logout,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

router.post("/SignUp", register);
router.post("/login", login);
router.get("/profile", authMiddleware, userProfile);
router.post("/logout", logout);

module.exports = router;
