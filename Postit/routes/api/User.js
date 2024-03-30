/* eslint-disable no-undef */
// UserRoutes.js

const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/userController");

// Routes for user operations
router.post("/register", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getUsers);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
