const express = require("express");
const userRoutes = express.Router();
const {ensureAuthenticated} = require("../middlewares/auth")
const { getUserProfile, getUserProfileForm, updateUserProfile } = require("../controllers/userController");
const upload = require("../config/multer");

userRoutes.get("/profile",ensureAuthenticated, getUserProfile);
userRoutes.get("/profile/edit",ensureAuthenticated, getUserProfileForm);
userRoutes.post("/profile/edit",ensureAuthenticated, upload.single("profilePicture"), updateUserProfile);

module.exports = userRoutes;