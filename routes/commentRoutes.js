const express = require('express');
const commentRoutes = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");
const {addComment, getCommentForm} = require('../controllers/commentController')

//add comment
commentRoutes.post('/posts/:id/comment', ensureAuthenticated, addComment) 
commentRoutes.get('/comments/:id/edit',ensureAuthenticated, getCommentForm)
module.exports = commentRoutes;