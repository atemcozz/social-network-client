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
  static async getPopularPosts() {
    return api.get(`/posts/popular`);
  }
  static async getPostByID(id) {
    return api.get(`/post/${id}`);
  }
  static async getPostsByUser(id) {
    return api.get(`/posts/${id}`);
  }
  static async createPost(post) {
    return api.post(`/post`, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static async createComment(data) {
    return api.post("/post/comment", data);
  }
  static async getComments(post_id) {
    return api.get(`/post/comments/${post_id}`);
  }
  static async deleteComment(id) {
    return api.delete(`/post/comment/${id}`);
  }
  static async deletePost(id) {
    return api.delete(`/post/${id}`);
  }
}
