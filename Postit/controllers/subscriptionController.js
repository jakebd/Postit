/* eslint-disable no-undef */
// SubscriptionController.js

const { Subscription } = require("../models/Subscription");

const createSubscription = async (req, res) => {
  try {
    const newSubscription = new Subscription(req.body);
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { userId, subpostitsId } = req.body;
    const deletedSubscription = await Subscription.findOneAndDelete({
      userId,
      subpostitsId,
    });
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserSubscriptions = async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptions = await Subscription.find({ userId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubpostitSubscribers = async (req, res) => {
  try {
    const { subpostitsId } = req.params;
    const subscriptions = await Subscription.find({ subpostitsId });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubscription,
  deleteSubscription,
  getUserSubscriptions,
  getSubpostitSubscribers,
};
