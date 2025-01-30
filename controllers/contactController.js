import Contact from "../models/contact";
import coreController from "./coreController";

class ContactController extends coreController {
  constructor() {
    super(Contact);
  }
}

export default ContactController;
