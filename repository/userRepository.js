import user from "../models/user.js";

export default class UserRepository {
  constructor() {
    this.model = user;
  }

  async register(name, email, password) {
    return await this.model.register({name, email, password});
  }

  async login(email, password) {
    return await this.model.login({email, password});
  }
}
