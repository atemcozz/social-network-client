import React from "react";

import { useQuery } from "react-query";

import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
const Bookmarks = () => {
  const {
    data: postsQuery,
    isLoading: postsLoading,
    error,
    refetch: updatePosts,
  } = useQuery("fetchBookmarks", PostService.getSavedPosts);
  if (postsLoading) {
    return (
      <MainLayout>
        <div className="px-4">
          <Heading>Закладки</Heading>

          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <Heading>Закладки</Heading>

        <PostList posts={postsQuery?.data} onChange={updatePosts} />
        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default Bookmarks;
