import express from "express";
import UserController from "../controllers/userController.js";
import { UserValidation } from "../middleware/userValidation.js";

const userController = new UserController();

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for user authentication and authorization
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 */

//Router para register a new user
router.post("/register", UserValidation, userController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User authenticated successfully
 *       400:
 *         description: Authentication error
 */

//Router to login the user
router.post("/login", userController.login);

export default router;
