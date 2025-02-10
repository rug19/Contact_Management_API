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

  async getById(id) {
    try {
      const contact = await contactRepository.findById(id);
      if (!contact) {
        throw new Error("Contato não encontrado");
      }

      return contact;
    } catch (error) {
      throw new Error(`Erro ao procurar o contato${error.message}`);
    }
  }

  async create(name, phone, email) {
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

  async update(id, name, phone, email) {
    try {
      //Update the contact
      const item = await contactRepository.findById(id);
      if (!item) {
        throw new Error("Item não encontrado!");
      }
      await item.update({ name, phone, email });
      return item;
    } catch (error) {
      throw new Error(`Erro ao atualizar o contato${error.message}`);
    }
  }

  async delete(id){
    try{
      const item  = await contactRepository.findById(id);
      if (!item) {
        throw new Error("Contato não encontrado!")
      }
      item.destroy();
      console.log("Item apagado")
    } catch(error){
      throw new Error(`Erro ao deletar contato: ${error.message}`)
    }
  }
}

export default ContactService;
