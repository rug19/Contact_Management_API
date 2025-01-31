import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

//Difine the model contact
const contacts = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.UUID, //Random ID
      defaultValue: DataTypes.UUIDV4, //Generate a ID automatically
      primaryKey: true, //Define with primary Key
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false, //Don't allow null values
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, //Allow null values
    },
  },
  {
    timestamps: true, // Sequelize cria automaticamente createdAt e updatedAt
  }
);

export default contacts;
