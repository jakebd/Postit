import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  postId: {
    type: DataTypes.INTEGER,

    onDelete: "CASCADE",
  },
  replyToId: {
    type: DataTypes.INTEGER,
  },
});

Comment.sync({ alter: true })
  .then(() => {
    console.log("Comment table created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Comment;
