import express from "express";
import ContactController from "../controllers/contactController.js";
import { DataValidation } from "../middleware/contactValidation.js";
import { contactUpdateValidation } from "../middleware/cotactUpdate.js";
import authenticate from "../middleware/authMiddleware.js";

const contactController = new ContactController();

const router = express.Router(); //Create um router from express

/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: An API for mananging contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
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
 *         description: Contact created successfully!
 *       400:
 *         description: Error creating contact
 */
//Route to create a new contact
router.post("/contacts",authenticate, DataValidation, contactController.create);


/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Retrieves all contacts
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   email:
 *                     type: string
 *       400:
 *         description: Failed to retrieve contacts due to an internal error
 */
//Route to get all the contacts
router.get("/contacts", authenticate, contactController.getAll);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Retrieve a contact by ID
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contact found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Error retrieving contact
 */
//Route to get the contact by id
router.get("/contacts/:id", authenticate, contactController.getById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Updates an existing contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
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
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Error updating contact
 */
//Route to update teh contact
router.put("/contacts/:id",authenticate, contactUpdateValidation, contactController.update);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do contato
 *     responses:
 *       204:
 *         description: Contact delete successfully
 *       400:
 *         description: Error delete contact
 */
//Router to delete the contact
router.delete("/contacts/:id",authenticate, contactController.delete);

export default router;
