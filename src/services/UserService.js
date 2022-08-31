import api from "../api/server";

export default class UserService {
  static async fecthUsers() {
    return api.get("/users");
  }
  static async getUser(id) {
    return api.get(`/user/${id}`);
  }
  static async updateUser(id, data) {
    return api.put(`/user/${id}`, data);
  }
}
