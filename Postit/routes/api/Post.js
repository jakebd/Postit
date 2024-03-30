/* eslint-disable no-undef */
// PostRoutes.js

const express = require("express");
const router = express.Router();
const PostController = require("../../controllers/postController");

// Routes for post operations
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/:id", PostController.getPostById);
router.get("/", PostController.getPosts);
router.get("/subpostit/:id", PostController.getPostsBySub);


module.exports = router;
