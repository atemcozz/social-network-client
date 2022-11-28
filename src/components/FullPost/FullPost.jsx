import React from "react";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";

import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";

import CommentSection from "./CommentSection";
import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
const FullPost = () => {
  const store = useStore();
  const { id } = useParams();
  const [post, postLoading, postError] = useRequest(() =>
    PostService.getPostByID(id)
  );

  // const [comments, commentsLoading, commentsError, updateComments] = useRequest(
  //   () => PostService.getComments(id)
  // );
  const [comments, setComments] = useState();
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);

  async function sendComment(comment) {
    await PostService.createComment({
      post_id: post.id,
      user_id: store.user?.id,
      body: comment.body,
      belongsTo: comment.belongsTo,
    })
      .then((res) => {
        setComments((state) => [...state, res.data]);
        // updateComments();
      })
      .catch();
  }
  async function deleteComment(id) {
    await PostService.deleteComment(id)
      .then(() => setComments((state) => state.filter((c) => c.id !== id)))
      .catch((err) => setCommentsError(err));
  }
  useEffect(() => {
    setCommentsLoading(true);
    PostService.getComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => setCommentsError(err))
      .finally(() => setCommentsLoading(false));
  }, [id]);
  if (commentsLoading || postLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col gap-4 ">
        <div className="font-bold text-xl ml-4">Пост</div>
        {postError && (
          <>
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              В процессе загрузки поста произошла ошибка. Попробуйте
              перезагрузить страницу.
            </div>
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              {postError.message}
            </div>
          </>
        )}
        {post && (
          <div className="px-4">
            <Post post={post} />
          </div>
        )}

        {comments && (
          <>
            <div className="font-bold text-xl ml-4">
              Комментарии ({comments.length})
            </div>
            <CommentSection
              comments={comments}
              error={commentsError}
              onSend={sendComment}
              onDelete={deleteComment}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default FullPost;
