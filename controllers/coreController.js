import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserService from "../service/userService.js";
import ContactService from "../service/contactService.js";

dotenv.config();

export const DataValidation = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("phone").notEmpty().withMessage("Telefone é obrigatório"),
  body("email").notEmpty().isEmail().withMessage("O email deve ser válido"),
];

export const UserValidation = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("email").notEmpty().isEmail().withMessage("O email deve ser válido"),
  body("password").notEmpty().withMessage("Senha obrigatória"),
];

const userService = new UserService();
const contactService = new ContactService();
export default class coreController {
  getAll = async (res) => {
    try {
      const items = await contactService.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.messagem });
    }
  };

  getById = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    //Verify if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Return the errors
    }
    try {
      const { name, phone, email } = req.body;

      //Create a  new contact
      const newContact = await contactService.create(name, phone, email);
      res.status(201).json(newContact);
      console.log("Contact sucssfuly create");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    const errors = validationResult(req); //Verify if there are any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Return the errors
    }
    try {
      const { name, phone, email } = req.body;

      //Verify if already has the same  email in the database
      if (email) {
        const existingEmail = await this.model.findOne({ where: { email } });
        if (existingEmail) {
          return res.status(400).json({ message: "Email já cadastrado" });
        }
      }

      //Update the contact
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      await item.update({ name, phone, email });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        res.status(404).json({ error: "Item not found" });
      }
      await item.destroy();
      res.status(204).send();
      console.log("Contato deletado com sucesso!");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Methods to register and login the user

  register = async (req, res) => {
    console.log("Recebendo requisição:", req.body); // Verifica se os dados estão corretos

    const errors = validationResult(req); //Verify if there are any errors
    if (!errors.isEmpty()) {
      console.log("Erros de validação:", errors.array());

      return res.status(400).json({ errors: errors.array() }); //Return the errors
    }
    try {
      const { name, email, password } = req.body;
      console.log("Chamando userService.register com:", name, email, password);

      //Create a new user
      const user = await userService.register(name, email, password);

      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso.", user });
    } catch (error) {
      console.error("Erro no controller register:", error);
      if (error.message.includes("E-mail já cadastrado")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Erro ao registrar o usuário" });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await userService.login(email, password);
      res
        .status(200)
        .json({ message: "Usuário autenticado com sucesso", result });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}
