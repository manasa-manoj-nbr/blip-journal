const express = require('express');
const commentRoutes = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");
const {addComment, getCommentForm, updateComment, deleteComment} = require('../controllers/commentController')

//add comment
commentRoutes.post('/posts/:id/comment', ensureAuthenticated, addComment) 
commentRoutes.get('/comments/:id/edit', ensureAuthenticated, getCommentForm)
commentRoutes.put("/comments/:id", ensureAuthenticated, updateComment);
commentRoutes.delete("/comments/:id", ensureAuthenticated, deleteComment);

module.exports = commentRoutes;