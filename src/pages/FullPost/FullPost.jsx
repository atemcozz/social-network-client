import React from "react";

import {PostService} from "../../features/Post";
import {useParams} from "react-router-dom";

import Spinner from "../../ui/Spinner/Spinner";
import {Post} from "../../features/Post";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import {CommentSection} from "../../features/Comment";
import {useState} from "react";
import {useEffect} from "react";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import store from "../../store";
import {useQuery} from "react-query";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import {PostContainer} from "../../features/Post";
import {CommentService} from "../../features/Comment";

const FullPost = () => {

  const {id} = useParams();

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery(["fetchPost", id], () =>
    PostService.getPostByID(id).then((res) => res.data),
  );

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery("fetchPostComments", () => CommentService.getCommentsByPost(id)
    .then((res) => res.data));

  async function sendComment(comment) {
    await CommentService.createComment(post.id, comment)
      .then(() => refetchComments());
  }

  async function deleteComment(id) {
    await CommentService.deleteComment(id)
      .then(() => refetchComments());
  }

  if (commentsLoading || postLoading) {
    return (
      <MainLayout>
        <div className="font-bold text-xl mb-4">Пост</div>
        <PostPlaceholder/>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Heading>Пост</Heading>
        <div className={"mb-4"}>
          {postLoading && <PostPlaceholder/>}
          {post &&
            <PostContainer>
              {postError?.message && (
                <ErrorMessage>error</ErrorMessage>
              )}
              <Post content={post} contentExposed/>
            </PostContainer>
          }
        </div>
        {commentsLoading &&
          <div className={"flex justify-center items-center h-32"}>
            <Spinner/>
          </div>
        }
        {!commentsLoading && (
          <>
            <div className="font-bold text-xl mb-4">
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
