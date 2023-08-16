import React from "react";

import {useQuery} from "react-query";

import {PostList, PostService} from "../../features/Post";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";

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
