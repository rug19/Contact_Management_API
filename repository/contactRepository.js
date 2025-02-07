import contacts from "../models/contacts.js";

class ContactRepository {
  constructor() {
    this.model = contacts;
  }

  async findAll() {
    return await this.model.findAll();
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }
  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.update(id, data, { where: { id } });
  }

  async delete(id, data) {
    return await this.model.delete(id, data, { where: { id } });
  }
}

export default ContactRepository;
