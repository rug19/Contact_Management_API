import express from "express";
import UserController from "../controllers/userController.js";
import { UserValidation } from "../controllers/coreController.js";

const userController = new UserController();

const router = express.Router();

//Router para register a new user
router.post("/register", UserValidation, userController.register);

//Router to login the user
router.post("/login", userController.login);

router.get("/users", userController.getAll);

export default router;
