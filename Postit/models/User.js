import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  isPro: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;

User.sync({ force: true })
  .then(() => {
    console.log("User table created");
  })
  .catch((err) => {
    console.log(err);
  });
