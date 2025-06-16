const express = require("express");
const authRoutes = express.Router();
const { getLogin, login, getRegister, register, logout } = require("../controllers/authController");

authRoutes.get("/login", getLogin);

authRoutes.post("/login", login);

authRoutes.get("/register", getRegister);

authRoutes.post("/register", register);

authRoutes.get("/logout", logout);
module.exports = authRoutes;