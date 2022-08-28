import React from "react";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useParams } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";
const FullPost = () => {
  const { id } = useParams();
  const [post, postLoading, error] = useRequest(() =>
    PostService.getPostByID(id)
  );
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="font-bold text-xl pl-6">Пост</div>
      {postLoading && (
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      )}
      {error && (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки поста произошла ошибка. Попробуйте перезагрузить
            страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {error.message}
          </div>
        </>
      )}
      {post && <Post post={post} />}
    </div>
  );
};

export default FullPost;
