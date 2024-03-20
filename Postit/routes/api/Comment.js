/* eslint-disable no-undef */
// CommentRoutes.js

const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/commentController");

// Routes for comment operations
router.post("/", CommentController.createComment);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);
router.get("/:id", CommentController.getCommentById);
router.get("/", CommentController.getComments);

module.exports = router;
