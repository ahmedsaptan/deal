const express = require("express");
const router = express.Router();
const {
  register,
  login,
  validateOnLogin,
  validateOnRegister,
} = require("../controller/auth.controller");

router.post("/login", validateOnLogin(), login);
router.post("/register", validateOnRegister(), register);

module.exports = router;
