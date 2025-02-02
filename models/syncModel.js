import contacts from "./contacts.js";
import user from "./user.js";

export async function syncModel() {
  try {
    await user.sync({ force: false });
    await contacts.sync({ force: false }); //Synchronize the database's model
    console.log("Model synchronized with the database successfully.");
  } catch (error) {
    console.error("Error synchronizing model with the database:", error);
  }
}
