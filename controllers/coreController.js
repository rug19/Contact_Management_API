import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
import UserService from "../service/userService.js";
import ContactService from "../service/contactService.js";

dotenv.config();

export const DataValidation = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("phone").notEmpty().withMessage("Telefone é obrigatório"),
  body("email")
    .notEmpty()
    .withMessage("O campo email é obrigatório")
    .bail()
    .isEmail()
    .withMessage("O email deve ser válido"),
];

export const UserValidation = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("email")
    .notEmpty()
    .withMessage("O campo email é obrigatório")
    .bail()
    .isEmail()
    .withMessage("O email deve ser válido"),
  body("password").notEmpty().withMessage("Senha obrigatória"),
];

const userService = new UserService();
const contactService = new ContactService();
export default class coreController {
  getAll = async (req, res) => {
    try {
      const items = await contactService.getAll();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const item = await contactService.getById(req.params.id);

      res.status(200).json(item);
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
      console.log("Contato criado com sucesso");
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

      const item = await contactService.update(
        req.params.id,
        name,
        phone,
        email
      );
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const item = await contactService.delete(req.params.id);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //Methods to register and login the user

  register = async (req, res) => {
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
