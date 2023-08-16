import React from "react";

import {PostList, PostService} from "../../features/Post";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import Heading from "../../ui/Heading";
import {useSearchParams} from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import store from "../../store";

const New = () => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || 1);
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: updatePosts,
    error,
  } = useQuery(["fetchNewPosts", page], () => PostService.getPosts({
    page: params.get("page"),
    t: store.sessionTimestamp,
  })
    .then(query => query.data));

  function paginate(page) {
    params.set("page", page);
    setParams(params);
  }

  if (postsLoading) {
    return (
      <MainLayout page={"new"}>
        <div className="px-4">
          <Heading>Новое</Heading>
          <PostPlaceholder/>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout page={"new"}>
      <div className="min-h-screen">
        <Heading>Новое</Heading>
        <PostList posts={posts.contents} onChange={updatePosts}/>
        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
        <Paginator pagesCount={posts.pages_count} currentPage={page} onPageChange={paginate}/>
      </div>
    </MainLayout>
  );
};
export default New;
