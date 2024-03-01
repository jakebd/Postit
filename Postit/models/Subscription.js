import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const Subscription = sequelize.define("Subscription", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  subpostitsId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Subscription.sync()
  .then(() => {
    console.log("Subscription table created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Subscription;
