import api from "../api/server";

export default class AuthService {
  static async login(data) {
    return api.post("/login", data);
  }
  static async register(data) {
    return api.post("/register", data);
  }
  static async logout() {
    return api.get("/logout");
  }
}
