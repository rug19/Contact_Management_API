import { body } from "express-validator";

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
