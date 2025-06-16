const express = require("express");
const userRoutes = express.Router();
const { getLogin, login, getRegister, register, logout } = require("../controllers/authController");

userRoutes.get("/login", getLogin);

userRoutes.post("/login", login);

userRoutes.get("/register", getRegister);

userRoutes.post("/register", register);

userRoutes.get("/logout", logout);
module.exports = userRoutes;