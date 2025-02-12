import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/db.js";
import moment from "moment";

const user = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID, //Random ID
      defaultValue: DataTypes.UUIDV4, //Generate a ID automatically
      primaryKey: true, //Define with primary Key
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, //Allow null values
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true, // Sequelize cria automaticamente createdAt e updatedAt
  }
);

user.prototype.toJSON = function () {
  return {
    ...this.get(),
    createdAt: moment(this.createdAt).format("DD-MM-YYYY HH:mm:ss"),
    updatedAt: moment(this.updatedAt).format("DD-MM-YYYY HH:mm:ss"),
  };
};

//Method to hash the password before to save the password in the databe
user.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

//Method to compare the passwords
user.prototype.comparePassword = async function (candidatePassword) {
  //Password the user typed
  return await bcrypt.compare(candidatePassword, this.password); //Compare the password of the user with the database
};

export default user;
