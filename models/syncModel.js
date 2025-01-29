import Contact from "./contact.js";

export async function syncModel() {
  try {
    await Contact.sync({ force: false }); //Synchronize the database's model
    console.log("Model synchronized with the database successfully.");
  } catch (error) {
    console.error("Error synchronizing model with the database:", error);
  }
}
