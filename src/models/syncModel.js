 import Contact from "./contact.js";
 
 export async function syncModel() {
    try {
      await Contact.sync({ force: false }); //Synchronize the database's model
      console.log("Modelo sincronizado com o banco de dados");
    } catch (error) {
      console.error("Erro ao sincronizar o modelo:", error);
    }
  }
  
  