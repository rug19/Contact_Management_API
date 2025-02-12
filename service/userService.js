import UserRepository from "../repository/userRepository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const userRepository = new UserRepository();

dotenv.config();

class UserService {
  async register(name, email, password) {
    try {

      //Verify of the email is already exist in the database
      const existingEmail = await userRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error("E-mail já cadastrado");
      }

      //Create a new User
      const user = await userRepository.create({ name, email, password });
      console.log("Usuário criado com sucesso:", user);

      return user;
    } catch (error) {
      throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      //Verify id the user is already rgister
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error("E-mail ou senha  incorretos");
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error("E-mail ou senha incorretos");
      }

      //Generate token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("Usuario cadastrando com sucesso");
      return token;
    } catch (error) {
      throw new Error(`Erro ao autenticar usuário, ${error.message}`);
    }
  }
}

export default UserService;
