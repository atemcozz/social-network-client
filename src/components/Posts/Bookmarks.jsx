import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import { useContext } from "react";
import PostList from "../PostList/PostList";
import { useEffect } from "react";
import MainLayout from "../Layout/MainLayout/MainLayout";
import useStore from "../../hooks/useStore";
const Bookmarks = () => {
  const store = useStore();
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getSavedPosts()
  );

  if (postsLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="min-h-screen px-4">
        <div className="font-bold text-xl mb-4">Закладки</div>

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
export default Bookmarks;
