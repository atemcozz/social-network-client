import React from "react";

import {useQuery} from "react-query";

import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";

const Bookmarks = () => {
  const {
    data: posts,
    isLoading: postsLoading,
    error,
    refetch: updatePosts,
  } = useQuery("fetchBookmarks", () => PostService.getSavedPosts().then(query => query.data));
  if (postsLoading) {
    return (
      <MainLayout>
        <Heading>Закладки</Heading>
        <PostPlaceholder/>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Heading>Закладки</Heading>

        <PostList posts={posts.contents} onChange={updatePosts}/>
        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default Bookmarks;
