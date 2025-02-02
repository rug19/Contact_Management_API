import express from "express";
import ContactController from "../controllers/contactController.js";
import { DataValidation } from "../controllers/coreController.js";
import authenticate from "../middleware/authMiddleware.js";

const contactController = new ContactController();

const router = express.Router(); //Create um router from express

//Route to create a new contact
router.post("/contacts",authenticate, DataValidation, contactController.create);
//Route to get all the contacts
router.get("/contacts", authenticate, contactController.getAll);
//Route to get the contact by id
router.get("/contacts/:id", contactController.getById);
//Route to update teh contact
router.put("/contacts/:id",authenticate, DataValidation, contactController.update);
//Router to delete the contact
router.delete("/contacts/:id",authenticate, contactController.delete);

export default router;
