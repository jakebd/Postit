import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const Vote = sequelize.define("Vote", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,

    onDelete: "CASCADE", // Cascade delete when the referenced post is deleted
  },
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,

    onDelete: "CASCADE", // Cascade delete when the referenced comment is deleted
  },
  type: {
    type: DataTypes.ENUM("UP", "DOWN"),
  },
});

Vote.sync()
  .then(() => {
    console.log("Vote table created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Vote;
