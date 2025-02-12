import { body } from "express-validator";

export const contactUpdateValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("O nome deve ser uma string válida"),
  body("email").optional().isEmail().withMessage("O email deve ser válido"),
  body("phone")
    .optional().isNumeric()
    .withMessage("O número de telefone deve conter apenas dígitos numéricos"),
];
