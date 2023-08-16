import {makeAutoObservable} from "mobx";
import {AuthService} from "../features/Auth";
import {UserService} from "../features/User";

class Index {
  user = {};
  auth = false;
  userLoading = true;
  sessionTimestamp = new Date().valueOf();

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(auth) {
    this.auth = auth;
  }

  setUser(user) {
    this.user = user;
  }

  setUserLoading(status) {
    this.userLoading = status;
  }

  login(data) {
    return AuthService.login(data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        this.setAuth(true);
        this.setUser(res.data.user);
      });
  }

  register(data) {
    return AuthService.register(data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        this.setAuth(true);
        this.setUser(res.data.user);
      });
  }

  logout() {
    return AuthService.logout().then(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      this.setAuth(false);
      this.setUser(null);
    });
  }

  verifyAuth() {
    this.setUserLoading(true);
    return AuthService.refresh({
      refreshToken: localStorage.getItem("refresh_token"),
    })
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        this.setAuth(true);
        this.setUser(res.data.user);
        return res.data.accessToken;
      })
      .finally(() => this.setUserLoading(false));

  }

  updateUserProfile(user_id, data) {
    return UserService.updateUserProfile(user_id, data).then((res) => {
      console.log(res.data);
      this.setUser(res.data);
    });
  }

  updateUserPassword(data) {
    return UserService.updateUserPassword(data)
      .then(() => this.logout())
      .then(() => {
        this.setAuth(false);
        this.setUser(null);
      });

  }
}

export default new Index();