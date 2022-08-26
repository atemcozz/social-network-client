import api from "../api/server";

export default class PostService {
  static async likePost(user_id, post_id) {
    return api.post("/like_post", { user_id, post_id });
  }
  static async getLikeStatus(user_id, post_id) {
    return api.get(`/post_liked?user_id=${user_id}&post_id=${post_id}`);
  }
}
