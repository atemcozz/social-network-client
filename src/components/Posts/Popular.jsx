import React from "react";

import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import PostPlaceholder from "../UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../PostList/PostList";
import MainLayout from "../Layout/MainLayout/MainLayout";

const Popular = () => {
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getPosts({ sort: "popular" })
  );
  if (postsLoading) {
    return (
      <MainLayout>
        <div className="px-4">
          <div className="font-bold text-xl mb-4">Популярное</div>
          <PostPlaceholder />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <div className="font-bold text-xl mb-4">Популярное</div>

        <PostList posts={posts} onChange={updatePosts} />

        {error && (
          <div className="flex flex-col gap-2">
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              В процессе загрузки постов произошла ошибка. Попробуйте
              перезагрузить страницу.
            </div>
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              {error.toString()}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
export default Popular;
