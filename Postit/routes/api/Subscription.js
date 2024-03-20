/* eslint-disable no-undef */
// SubscriptionRoutes.js

const express = require("express");
const router = express.Router();
const SubscriptionController = require("../../controllers/subscriptionController");

// Routes for subscription operations
router.post("/", SubscriptionController.createSubscription);
router.delete("/", SubscriptionController.deleteSubscription);
router.get("/users/:userId", SubscriptionController.getUserSubscriptions);
router.get(
  "/subpostits/:subpostitsId",
  SubscriptionController.getSubpostitSubscribers
);

module.exports = router;
