import { body } from "express-validator";

export const DataValidation = [
  body("name")
    .notEmpty()
    .withMessage("O nome é obrigatório.")
    .bail()
    .isString()
    .withMessage("O nome deve conter apenas letras"),
  body("phone")
    .notEmpty()
    .withMessage("Telefone é obrigatório")
    .bail()
    .isNumeric()
    .withMessage("O número de telefone deve conter apenas dígitos numéricos"),
  body("email")
    .notEmpty()
    .withMessage("O campo email é obrigatório")
    .bail()
    .isEmail()
    .withMessage("O email deve ser válido"),
];
