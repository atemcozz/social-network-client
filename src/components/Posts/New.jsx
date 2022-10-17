import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import { useContext } from "react";
import { Context } from "../../index";
import PostList from "../PostList/PostList";
import { useEffect } from "react";
const New = () => {
  const { store } = useContext(Context);
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getPosts()
  );

  if (postsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="font-bold text-xl pl-6 pb-4">Новое</div>
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
  );
};
export default New;
