import { DataTypes } from "sequelize";
import sequelize from "../Server/database.js";

const Subpostits = sequelize.define("Subpostits", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Subpostits.sync({ force: true })
  .then(() => {
    console.log("Subpostits table created");
  })
  .catch((err) => {
    console.log(err);
  });

export default Subpostits;
