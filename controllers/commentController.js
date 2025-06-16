const asyncHandler = require('express-async-handler');
const Post = require('../models/Post')
const Comment = require('../models/Comment')
exports.addComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
        return res.render("postDetails", {
            title: "Post",
            post,
            user: req.user,
            error: "Post not found",
            sunccess: "",
        });
    };
    if (!content) {
        return res.render("postDetails", {
            title: "Post",
            post,
            user: req.user,
            error: "Comment cannot be empty",
            sunccess: "",
        });
    };

    const comment = new Comment({
        content,
        post: postId,
        author: req.user._id,
    })
    await comment.save();
    post.comment.push(comment._id);
    await post.save();
    res.redirect(`/posts/${postId}`)
});

exports.getCommentForm = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return res.render("postDetails", {
        title: "Comment",
        comment,
        user: req.user,
        error: "Comment not found",
        success: ""
    });
    }
    res.render("editComment", {
        title: "Comment",
        comment,
        user: req.user,
        error: "",
        success: ""
    });
});


exports.updateComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return res.render("postDetails", {
            title: "Post",
            comment,
            user: req.user,
            error: "Comment not found",
            success: ""
        });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
        return res.render("postDetails", {
            title: "Post",
            comment,
            user: req.user,
            error: "You are not authorized to edit this comment",
            success: ""
        })
    }
    comment.content = content || comment.content;
    await comment.save();
    res.redirect(`/posts/${comment.post}`);
});

exports.deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return res.render("postDetails", {
            title: "Post",
            comment,
            user: req.user,
            error: "Comment not found",
            success: ""
        });
    }
    if (comment.author.toString() !== req.user._id.toString()) {
        return res.render("postDetails", {
            title: "Post",
            comment,
            user: req.user,
            error: "You are not authorized to delete this comment",
            success: ""
        })
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/posts/${comment.post}`);
})