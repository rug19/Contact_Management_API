import ContactRepository from "../repository/contactRepository.js";

const contactRepository = new ContactRepository();
class ContactService {

   
  async getAll() {
    try {
      const allContacts = await contactRepository.findAll();
      if (!allContacts) {
        throw new Error("Nenhum contato");
      }
      return allContacts;
    } catch (error) {
      throw new Error("Erro ao listar contato");
    }
  }

  async create(name, phone, email) {
    console.log("🔹 Dados antes da criação:", { name, phone, email });
    try {
      //Verify if already has the same  email in the database
      const existingEmail = await contactRepository.findByEmail(email);
      if (existingEmail) {
        throw new Error("Email já cadastrado!");
      }

      //Create a new contact
      const newContact = await contactRepository.create({
        name,
        phone,
        email,
      });
      console.log("Contato criado com sucesso", newContact);
      return newContact;
    } catch (error) {
      throw new Error(`Erro ao criar contato, ${error.message}`);
    }
  }
}

export default ContactService;
