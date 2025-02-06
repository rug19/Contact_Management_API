import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserService from "../service/userService.js";

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
export default class coreController {
  constructor(model) {
    this.model = model;
  }

  getAll = async (req, res) => {
    try {
      const items = await this.model.findAll();
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
      //Create a  new contact
      const newItem = await this.model.create({ name, phone, email });
      res.status(201).json(newItem);
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
    const errors = validationResult(req); //Verify if there are any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Return the errors
    }
    try {
      const { name, email, password } = req.body;

      //Create a new user
      const user = await this.model.register({ name, email, password });
      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso.", user });
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar o usuário" });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      //Verify if the user already exist
      const user = await this.model.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: "E-mail ou senha incorretos." });
      }

      //Verify  the password is correct
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: "Email ou senha incorretos" });
      }

      //Generate the token JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch {
      res.status(500).json({ error: "Erro ao autenticar o usuário. " });
    }
  };
}
