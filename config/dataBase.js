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
    logging: (msg) => console.log(msg),
  }
);

export default sequelize;
