import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";

const Home = () => {
  const [posts, postsLoading, error] = useRequest(() => PostService.getPosts());
  return (
    <div className="w-full px-4 min-h-screen flex flex-col gap-4">
      {postsLoading ? (
        <div className="flex items-center justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="font-bold text-xl pl-6">Популярное</div>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </>
      )}
    </div>
  );
};
export default Home;
