import user from "../models/user.js";

class UserRepository {
  constructor() {
    this.model = user;
  }

  async create(useData) {
    return await this.model.create(useData);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }
}

export default UserRepository;
