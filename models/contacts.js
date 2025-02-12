import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import moment from "moment";

const contacts = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

// Formata as datas ao converter para JSON
contacts.prototype.toJSON = function () {
  return {
    ...this.get(),
    createdAt: moment(this.createdAt).format("DD-MM-YYYY HH:mm:ss"),
    updatedAt: moment(this.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
  };
};

export default contacts;
