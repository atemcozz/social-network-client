import React from "react";

import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import { useQuery } from "react-query";
import Heading from "../../components/UI/Heading";
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
          <Heading>Новое</Heading>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <Heading>Новое</Heading>

        <PostList posts={postsQuery?.data} onChange={updatePosts} />

        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default New;
