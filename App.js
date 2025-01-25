import sequelize from "./config/dataBase.js";

//Function to conect to db
async function initializeDb() {
    try {
      await sequelize.authenticate();
      console.log("Conexão bem sucedida");
    } catch (error) {
      console.log("Falha ao se conectar com banco", error);
    }
  }
  
  initializeDb();