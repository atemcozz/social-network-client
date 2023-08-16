import api from "../../../api/server";

export class UserService {
  static getUserByID(id) {
    return api.get(`/user/id/${id}`);
  }


  static updateUserProfile(id, data) {
    return api.put(`/user/profile/${id}`, data);
  }

  static updateUserPassword(data) {
    return api.put(`/user/password/`, data);
  }

  static updateUserEmail(data) {
    return api.put(`/user/email/`, data);
  }

  static subscribeUser(id) {
    return api.put(`/user/subscribe/${id}`);
  }

  static getUserSubscriptions(id) {
    return api.get(`/user/subscriptions/${id}`);
  }

  static getUserSubscribers(id) {
    return api.get(`/user/subscribers/${id}`);
  }

  static getUnreadNotificationsCount() {
    return api.get("/user/notifications_count");
  }

  static getUserNotifications(params) {
    return api.get("/user/notifications", {
      params,
    });

  }
}
