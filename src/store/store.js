import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

export default class Store {
  user = {};
  isAuth = false;
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(auth) {
    this.isAuth = auth;
  }
  setUser(user) {
    this.user = user;
  }
  async login(nickname, password, callback) {
    try {
      const res = await AuthService.login(nickname, password);
      //console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
      callback(null);
    } catch (e) {
      callback(e.response?.data?.msg);
      console.error(e.response?.data?.msg);
    }
  }
  async register(name, surname, nickname, password) {
    try {
      const res = await AuthService.register(name, surname, nickname, password);
      //console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.error(e.response?.data?.msg);
    }
  }
  async logout() {
    try {
      const res = await AuthService.logout();
      //console.log(res);
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.error(e.response?.data?.msg);
    }
  }
}
