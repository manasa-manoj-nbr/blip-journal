const asyncHandler = require("express-async-handler");
const User  = require("../models/User");
const Post = require("../models/Post");
//get user profile
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
            success: ""
        })
    }
//fetch user post
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    
    res.render("profile", {
        title: "Profile",
        user,
        posts,
        user,
        error: "",
        success: "",
        postCount: posts.length
    })

})