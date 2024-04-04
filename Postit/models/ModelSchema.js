/* eslint-disable no-undef */
const { Schema, model } = require("mongoose");

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: {type: String, required: true},
    image: { type: String },
    isPro: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Subpostits Schema
const subpostitsSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    creatorId: { type: String, ref: "User", required: true },
  },
  { timestamps: true }
);

// Subscription Schema
const subscriptionSchema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    subpostitsId: { type: String, ref: "Subpostits", required: true },
  },
  { _id: false }
);

// Post Schema
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed },
    authorId: { type: String, ref: "User", required: true },
    subpostitsId: { type: String, ref: "Subpostits", required: true },
  },
  { timestamps: true }
);

// Comment Schema
const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    authorId: { type: String, ref: "User", required: true },
    postId: { type: String, ref: "Post", required: true },
    replyToId: { type: String, ref: "Comment" },
  },
  { timestamps: true }
);

// Vote Schema
const voteSchema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    postId: { type: String, ref: "Post" },
    commentId: { type: String, ref: "Comment" },
    type: { type: String, enum: ["UP", "DOWN"], required: true },
  },
  { _id: false, timestamps: true }
);

// Model creation
const User = model("User", userSchema);
const Subpostits = model("Subpostits", subpostitsSchema);
const Subscription = model("Subscription", subscriptionSchema);
const Post = model("Post", postSchema);
const Comment = model("Comment", commentSchema);
const Vote = model("Vote", voteSchema);

module.exports = { User, Subpostits, Subscription, Post, Comment, Vote };
