import React from "react";

import PostService from "../../services/PostService";
import PostPlaceholder from "../UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../PostList/PostList";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import MainLayout from "../Layout/MainLayout/MainLayout";
import { useQuery } from "react-query";
const New = () => {
  const {
    data: postsQuery,
    isLoading: postsLoading,
    refetch: updatePosts,
    error,
  } = useQuery("fetchPosts", PostService.getPosts);

  if (postsLoading) {
    return (
      <MainLayout>
        <div className="px-4">
          <div className="font-bold text-xl mb-4">Новое</div>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <div className="font-bold text-xl mb-4">Новое</div>

        <PostList posts={postsQuery?.data} onChange={updatePosts} />

        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default New;
