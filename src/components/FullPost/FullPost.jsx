import React from "react";
import useRequest from "../../hooks/useRequest";
import PostService from "../../services/PostService";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Spinner from "../UI/Spinner/Spinner";
import Post from "../Post/Post";
import CommentInput from "../Post/CommentInput";
import Comment from "../Post/Comment";
import { useContext } from "react";
import { Context } from "../..";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { useEffect } from "react";
const FullPost = () => {
  const { store } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, postLoading, postError] = useRequest(() =>
    PostService.getPostByID(id)
  );

  // const [comments, commentsLoading, commentsError, updateComments] = useRequest(
  //   () => PostService.getComments(id)
  // );
  const [comments, setComments] = useState();
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [newCommentID, setNewCommentID] = useState();
  const fakeComments = [
    {
      id: 0,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: null,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 1,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 0,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 2,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 1,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 3,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 2,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 4,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 3,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 5,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 4,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 6,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 5,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 7,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 6,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 8,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 7,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 9,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 8,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 10,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 9,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 11,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 10,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 12,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 11,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 13,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 12,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 14,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 13,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 15,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 14,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 16,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 15,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 17,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 16,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 18,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 17,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 19,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 17,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
    {
      id: 20,
      body: "Тест веток",
      created_at: "2022-10-21T17:13:54.541Z",
      post_id: 76,
      belongsTo: 18,
      user: {
        id: 2,
        name: "Artem",
        surname: "Kosov",
        nickname: "atemcozz",
        avatar_url:
          "https://res.cloudinary.com/aqemcozz/image/upload/v1666361872/social-network/1666361872390-685705502.jpg",
      },
    },
  ];
  async function sendComment(comment) {
    await PostService.createComment({
      post_id: post.id,
      user_id: store.user?.id,
      body: comment.body,
      belongsTo: comment.belongsTo,
    })
      .then((res) => {
        setComments((state) => [...state, res.data]);
        // updateComments();
      })
      .catch();
  }
  async function deleteComment(id) {
    await PostService.deleteComment(id)
      .then(() => setComments((state) => state.filter((c) => c.id !== id)))
      .catch((err) => setCommentsError(err));
  }
  useEffect(() => {
    setCommentsLoading(true);
    PostService.getComments(id)
      .then((res) => setComments(res.data))
      .catch((err) => setCommentsError(err))
      .finally(() => setCommentsLoading(false));
  }, []);
  if (commentsLoading || postLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col gap-4 ">
      <div className="font-bold text-xl ml-4">Пост</div>
      {postError && (
        <>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки поста произошла ошибка. Попробуйте перезагрузить
            страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {postError.message}
          </div>
        </>
      )}
      {post && (
        <div className="px-4">
          <Post post={post} />
        </div>
      )}

      {comments && (
        <>
          <div className="font-bold text-xl ml-4">
            Комментарии ({comments.length})
          </div>
          <CommentSection
            comments={comments}
            error={commentsError}
            onSend={sendComment}
            onDelete={deleteComment}
          />
        </>
      )}
    </div>
  );
};

export default FullPost;
