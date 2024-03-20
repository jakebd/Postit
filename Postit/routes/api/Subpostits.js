/* eslint-disable no-undef */
// SubpostitsRoutes.js

const express = require("express");
const router = express.Router();
const SubpostitsController = require("../../controllers/subpostitsController");

// Routes for subpostit operations
router.post("/", SubpostitsController.createSubpostit);
router.put("/:id", SubpostitsController.updateSubpostit);
router.delete("/:id", SubpostitsController.deleteSubpostit);
router.get("/:id", SubpostitsController.getSubpostitById);
router.get("/", SubpostitsController.getSubpostits);

module.exports = router;
