import React from "react";

import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";

import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../../components/Post/Post";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import CommentSection from "../../components/CommentSection/CommentSection";
import { useState } from "react";
import { useEffect } from "react";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
import { useQuery } from "react-query";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
const FullPost = () => {
  const store = useStore();
  const { id } = useParams();

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery("fetchPost", () =>
    PostService.getPostByID(id).then((res) => res.data)
  );

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
        <div className="px-4">
          <div className="font-bold text-xl mb-4">Пост</div>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col gap-4">
        <Heading>Пост</Heading>

        {postError?.message && (
          <ErrorMessage>{postError?.message}</ErrorMessage>
        )}
        {post && (
          <div className="px-4">
            <Post post={post} contentExposed />
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
