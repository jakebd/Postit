/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/api/User");
const postRoutes = require("./routes/api/Post");
const commentRoutes = require("./routes/api/Comment");
const subpostitsRoutes = require("./routes/api/Subpostits");
const subscriptionRoutes = require("./routes/api/Subscription");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/subpostits", subpostitsRoutes);
app.use("/api/subscriptions", subscriptionRoutes);


//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to DB and Server is running on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
