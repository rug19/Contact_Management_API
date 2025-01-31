import contacts from "./contacts.js";

export async function syncModel() {
  try {
    await contacts.sync({ force: false }); //Synchronize the database's model
    console.log("Model synchronized with the database successfully.");
  } catch (error) {
    console.error("Error synchronizing model with the database:", error);
  }
}
