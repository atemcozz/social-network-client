import api from "../api/server";

export default class AuthService {
  static async login(nickname, password) {
    return api.post("/login", { nickname, password });
  }
  static async register(name, surname, nickname, password) {
    return api.post("/login", { name, surname, nickname, password });
  }
  static async logout() {
    return api.get("/logout");
  }
}
