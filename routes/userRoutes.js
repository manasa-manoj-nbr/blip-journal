const express = require("express");
const userRoutes = express.Router();
const {ensureAuthenticated} = require("../middlewares/auth")
const { getUserProfile } = require("../controllers/userController");

userRoutes.get("/profile",ensureAuthenticated, getUserProfile);


module.exports = userRoutes;