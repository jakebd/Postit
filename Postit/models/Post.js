import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.JSON,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  subpostitsId: {
    type: DataTypes.INTEGER,
  },
});

Post.sync({ force: true })
  .then(() => {
    console.log("Subpostits table created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Post;
