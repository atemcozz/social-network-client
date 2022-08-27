import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../api/server";
export default class Store {
  user = {};
  isAuth = false;
  isLoading = true;
  constructor() {
    makeAutoObservable(this);
  }
  setAuth(auth) {
    this.isAuth = auth;
  }
  setUser(user) {
    this.user = user;
  }
  setLoading(loading) {
    this.isLoading = loading;
  }
  async login(nickname, password, callback) {
    try {
      this.setLoading(true);
      const res = await AuthService.login(nickname, password);
      //console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
      callback(null);
    } catch (e) {
      callback(e.response?.data?.msg);
      console.error(e.response?.data?.msg);
    } finally {
      this.setLoading(false);
    }
  }
  async register(name, surname, nickname, password) {
    try {
      this.setLoading(true);
      const res = await AuthService.register(name, surname, nickname, password);
      //console.log(res);
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.error(e.response?.data?.msg);
    } finally {
      this.setLoading(false);
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
  async checkAuth() {
    try {
      this.setLoading(true);
      // await new Promise((res) => setTimeout(res, 3000));
      const res = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.accessToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.error(e.response?.data?.msg);
    } finally {
      this.setLoading(false);
    }
  }
}
