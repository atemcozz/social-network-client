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
  static async addBookmark(post_id) {
    return api.post(`/bookmark`, { post_id });
  }
  static async subscribeUser(id) {
    return api.post(`/user/${id}/subscribe`);
  }
}
