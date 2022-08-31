import React from "react";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";
import CommentInput from "../Post/CommentInput";
import Comment from "../Post/Comment";
const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, postLoading, postError] = useRequest(() =>
    PostService.getPostByID(id)
  );
  const [comments, commentsLoading, commentsError, updateComments] = useRequest(
    () => PostService.getComments(id)
  );
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size={"24px"} />
        </button>
        <div className="font-bold text-xl">Пост</div>
      </div>

      {postLoading && (
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      )}
      {postError && (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки поста произошла ошибка. Попробуйте перезагрузить
            страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {postError.message}
          </div>
        </>
      )}
      {post && <Post post={post} />}
      {comments && (
        <div className="font-bold text-xl">Комментарии ({comments.length})</div>
      )}

      <CommentInput post={post} onSend={updateComments} />
      {commentsError && (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки комментариев произошла ошибка. Попробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {commentsError.message}
          </div>
        </>
      )}
      {comments &&
        comments.map((comment, index) => (
          <Comment key={index} comment={comment} onChange={updateComments} />
        ))}
    </div>
  );
};

export default FullPost;
