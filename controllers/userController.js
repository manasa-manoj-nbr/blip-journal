const asyncHandler = require("express-async-handler");
const File = require("../models/File");
const cloudinary = require("../config/cloudinary");
const User  = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
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

exports.getUserProfileForm = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
            success: ""
        })
    }
    res.render("editProfile", {
        title: "Edit Profile",
        user,
        error: "",
        success: ""
    })
})

exports.updateUserProfile = asyncHandler(async(req, res) => {
    const { username, email, bio } = req.body;
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
            success: ""
        })
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;

  if (req.file) {
    if (user.profilePicture && user.profilePicture.public_id) {
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }
    const file = new File({
      url: req.file.path,
      public_id: req.file.filename,
      uploaded_by: req.user._id,
    });
    await file.save();
    user.profilePicture = { url: file.url, public_id: file.public_id, };
    }
    
    await user.save();
    res.render("editProfile", {
        title: "Edit Profile",
        user,
        error: "",
        success: "Profile updated successfully",
    })
})

exports.deleteUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) {
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
            success: ""
        })
    }

    if (user.profilePicture && user.profilePicture.url) {
        await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }

    const posts = await Post.find({ author: req.user._id });
    for (const post of posts) {
        for (const image of post.images) {
            await cloudinary.uploader.destroy(image.public_id)
        }
        await Comment.deleteMany({ post: post._id });
        await Post.findByIdAndDelete(post._id);
    }
    await Comment.deleteMany({ author: req.user._id });
    const files = await File.find({ uploaded_by: req.user._id });
    for (const file of files) {
        await cloudinary.uploader.destroy(file.public_id);
        await File.findByIdAndDelete(file._id);
    }
    await User.findByIdAndDelete(req.user._id);
    res.redirect("/auth/register");
})