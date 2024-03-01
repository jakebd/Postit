import User from "./models/User.js";
import Subpostits from "./models/Subpostits.js";
import Subscription from "./models/Subscription.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import Vote from "./models/Vote.js";
import sequelize from "../Server/database";

User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Subpostits, { through: Subscription, foreignKey: "userId" });
Subpostits.belongsToMany(User, {
  through: Subscription,
  foreignKey: "subpostitsId",
});

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Subpostits.hasMany(Post, { foreignKey: "subpostitsId" });
Post.belongsTo(Subpostits, { foreignKey: "subpostitsId" });

User.hasMany(Vote, { foreignKey: "userId" });
Vote.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Vote, { foreignKey: "postId" });
Vote.belongsTo(Post, { foreignKey: "postId" });

Comment.hasMany(Vote, { foreignKey: "commentId" });
Vote.belongsTo(Comment, { foreignKey: "commentId" });

Comment.hasMany(Comment, { as: "Replies", foreignKey: "replyToId" });
Comment.belongsTo(Comment, { as: "Parent", foreignKey: "replyToId" });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("associations created");
  })
  .catch((err) => {
    console.log(err);
  });
