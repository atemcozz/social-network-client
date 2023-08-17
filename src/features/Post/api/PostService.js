import api from "../../../api/server";

export class PostService {
  static likePost(post_id) {
    return api.put(`post/like/${post_id}`);
  }

  static getPosts(options) {
    return api.get(`/post`, {
      params: options,
    });
  }

  static getFeedPosts(options) {
    return api.get(`/post/feed`, {
      params: options,
    });
  }

  static getPostByID(id) {
    return api.get(`/post/${id}`);
  }

  static getPostsByUserID(user_id) {
    return api.get(`/post`, {
      params: {
        user_id,
      },
    });
  }

  static getSavedPosts() {
    return api.get(`/post/saved`);
  }

  static createPost(post) {
    return api.post(`/post`, post);
  }

  static deletePost(id) {
    return api.delete(`/post/${id}`);
  }

  static addBookmark(post_id) {
    return api.put(`post/save/${post_id}`);
  }
}
