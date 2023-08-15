import api, {API_URL} from "../../../api/server";
import axios from "axios";

export class AuthService {
  static refresh(data) {
    return api.post(`/auth/refresh`, data);
  }

  static login(data) {
    return api.post("/auth/login", data);
  }

  static register(data) {
    return api.post("/auth/register", data);
  }

  static logout() {
    return api.post("/auth/logout", {
      refreshToken: localStorage.getItem("refresh_token"),
    });
  }

  static requestPasswordRecover(data) {
    return api.post("/auth/password_recover", data);
  }

  static confirmPasswordRecover(uuid, data) {
    return api.post("/auth/password_confirm", data, {
      params: {
        uuid,
      },
    });
  }
}
