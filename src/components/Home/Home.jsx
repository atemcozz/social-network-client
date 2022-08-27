import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";

const Home = () => {
  const [posts, postsLoading, error] = useRequest(() => PostService.getPosts());
  return (
    <div className="flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Популярное</div>
      {postsLoading && (
        <div className="flex items-center justify-center w-full">
          <Spinner />
        </div>
      )}
      {error ? (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки постов произошла ошибка. Пеопробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {error.toString()}
          </div>
        </>
      ) : (
        posts?.map((post, index) => <Post key={index} post={post} />)
      )}
    </div>
  );
};
export default Home;
