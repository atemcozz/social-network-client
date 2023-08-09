import api from "../api/server";

export default class CommentService {
  static createComment(post_id, data) {
    return api.post(`/comment/post/${post_id}`, data);
  }

  static getCommentsByPost(post_id) {
    return api.get(`/comment/post/${post_id}`);
  }

  static getCommentByID(id) {
    return api.get(`/comment/id/${id}`);
  }

  static deleteComment(id) {
    return api.delete(`/comment/id/${id}`);
  }

  static likeComment(id) {
    return api.put(`/comment/like/${id}`);
  }
}
