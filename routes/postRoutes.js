const express = require("express");
const postRoutes = express.Router();
const { getPostForm,createPosts, getPosts, getPostById, getEditPostForm, updatePost,deletePost } = require("../controllers/postController");
const upload = require("../config/multer");
const {ensureAuthenticated} = require("../middlewares/auth")
postRoutes.get('/add',ensureAuthenticated, getPostForm);
postRoutes.post('/add', ensureAuthenticated, upload.array("images", 5), createPosts);
//get all posts
postRoutes.get('/', getPosts);
//get post by id
postRoutes.get('/:id', getPostById);
postRoutes.get('/:id/edit', getEditPostForm);
postRoutes.put("/:id",ensureAuthenticated,upload.array("images",5),updatePost)
postRoutes.delete("/:id",ensureAuthenticated,deletePost)
module.exports = postRoutes;