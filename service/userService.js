import UserRepository from "../repository/userRepository.js";

const userRepository = new UserRepository();

export default class UserService {
  async register(name, email, password) {
    try {
      //Verifica se o email já está cadastrado
      const existingEmail = await userRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error("E-mail já cadastrado");
      }

      //Cria um novo contato
      const user = await userRepository.register({ name, email, password });
      return user;
    } catch (error) {
      throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
  }
}
