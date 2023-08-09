import React from "react";

import Spinner from "../../components/UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Heading from "../../components/UI/Heading";
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
