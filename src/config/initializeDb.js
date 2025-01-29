import sequelize from "./db.js";

//Function to conect to db
export async function initializeDb() {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem sucedida");
  } catch (error) {
    console.log("Falha ao se conectar com banco", error);
  }
}
