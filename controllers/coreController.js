import { body, validationResult } from "express-validator";
import { where } from "sequelize";
//Define the validaton out of the  class
export const validationCreate = [
  body("name").notEmpty().withMessage("O nome é obrigatório."),
  body("phone").notEmpty().withMessage("Telefone é obrigatório"),
  body("email").notEmpty().isEmail().withMessage("O email deve ser válido"),
];
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
    try {
      const item = await this.model.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      await item.update(req.body);
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
}
