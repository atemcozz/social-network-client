import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import { useContext } from "react";
import { Context } from "../../index";

const New = () => {
  const { store } = useContext(Context);
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getPosts()
  );
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Новое</div>
      {postsLoading && (
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      )}
      {error ? (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки постов произошла ошибка. Попробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {error.toString()}
          </div>
        </>
      ) : (
        posts?.map((post, index) => (
          <Post key={index} post={post} onChange={updatePosts} />
        ))
      )}
    </div>
  );
};
export default New;
