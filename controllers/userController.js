import user from "../models/user.js";
import coreController from "./coreController.js";


class UserController extends coreController {
    constructor() {
      super(user);
    }
  }
  
  export default UserController;