import express from "express";
import ContactController from "../controllers/contactController";

const contactController = new ContactController();

const router = express.Router(); //Create um router from express

//Route to create a new contact
router.post("/contacts", contactController.create);
//Route to get all the contacts
router.get("/contacts", contactController.getAll);

export default router;
