import api from "../api/server";

export default class PostService {
  static async likePost(post_id) {
    return api.post("/like_post", { post_id });
  }
  static async getLikeStatus(user_id, post_id) {
    return api.get(`/post_liked?user_id=${user_id}&post_id=${post_id}`);
  }
  static async getPosts() {
    return api.get(`/posts`);
  }
  static async createPost(description, attachments) {
    return api.post(`/post`, attachments, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
