import React from "react";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";
const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, postLoading, error] = useRequest(() =>
    PostService.getPostByID(id)
  );
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center bg-back hover:bg-back-darker p-2 rounded-full shadow text-primary"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft size={"24px"} />
        </button>
        <div className="font-bold text-xl">Пост</div>
      </div>

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
