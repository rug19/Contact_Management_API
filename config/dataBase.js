import { Sequelize } from "sequelize";
import dotenv from "dotenv";

//Load enviroment variables
dotenv.config();

//Database config
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALECT,
    port: 3307,//I was necessary to change the port baecause it was already in use the default: 3306, erase or change the port of your database
    logging: (msg) => console.log(msg),
  }
);

export default sequelize;
