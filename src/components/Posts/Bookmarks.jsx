import React from "react";

import { useQuery } from "react-query";

import PostService from "../../services/PostService";
import PostPlaceholder from "../UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../PostList/PostList";
import MainLayout from "../Layout/MainLayout/MainLayout";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
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
          <div className="font-bold text-xl mb-4">Закладки</div>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <div className="font-bold text-xl mb-4">Закладки</div>

        <PostList posts={postsQuery?.data} onChange={updatePosts} />
        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default Bookmarks;
