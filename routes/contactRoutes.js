import express from "express";
import ContactController from "../controllers/contactController.js";
import { DataValidation } from "../controllers/coreController.js";
import authenticate from "../middleware/authMiddleware.js";

const contactController = new ContactController();

const router = express.Router(); //Create um router from express


/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Cria um contato
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contato criado com sucesso!
 *       400:
 *         description: Erro ao criar um contato
 */
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
