import sequelize from "./db.js";

//Function to conect to db
export async function initializeDb() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}
