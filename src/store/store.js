import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../api/server";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = true;
  appTheme = "theme-light";

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

  setAppTheme(theme) {
    this.appTheme = theme;
  }

  async login(data) {
    this.setLoading(true);
    await AuthService.login(data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        this.setAuth(true);
        this.setUser(res.data.user);
      })
      .catch((e) => Promise.reject(e.response?.data?.msg))
      .finally(() => this.setLoading(false));
  }

  async register(data) {
    this.setLoading(true);
    await AuthService.register(data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        this.setAuth(true);
        this.setUser(res.data.user);
      })
      .catch((e) => Promise.reject(e.response?.data?.msg))
      .finally(() => this.setLoading(false));
  }

  async logout() {
    try {
      await AuthService.logout();
      //console.log(res);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
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
      const res = await axios.post(`${API_URL}/refresh`, {
        refreshToken: localStorage.getItem("refresh_token"),
      });
      // console.log(res.data);
      localStorage.setItem("access_token", res.data.accessToken);
      localStorage.setItem("refresh_token", res.data.refreshToken);
      this.setAuth(true);
      this.setUser(res.data.user);
    } catch (e) {
      console.error(e.response?.data?.msg);
    } finally {
      this.setLoading(false);
      //
    }
  }
}
