import React from "react";
import {PostList, PostService} from "../../features/Post";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import {useSearchParams} from "react-router-dom";
import store from "../../store";

const Popular = () => {
  const [searchParams] = useSearchParams();
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: updatePosts,
    error,
  } = useQuery("fetchPopularPosts", () =>
    PostService.getPosts({
      sort: "popular",
      page: searchParams.get("page"),
      t: store.sessionTimestamp,
    }).then(query => query.data),
  );
  if (postsLoading) {
    return (
      <MainLayout page={"popular"}>
        <Heading>Популярное</Heading>
        <PostPlaceholder/>
      </MainLayout>
    );
  }
  return (
    <MainLayout page={"popular"}>
      <div className="min-h-screen">
        <Heading>Популярное</Heading>
        <PostList posts={posts.contents} onChange={updatePosts}/>
        {error?.message && <ErrorMessage>{error?.message}</ErrorMessage>}
      </div>
    </MainLayout>
  );
};
export default Popular;
