import contacts from "../models/contacts.js";
import coreController from "./coreController.js";

class ContactController extends coreController {
  constructor() {
    super(contacts);
  }
}

export default ContactController;
