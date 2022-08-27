import React from "react";
import Button from "../UI/Button/Button";
import CheckButton from "../UI/Button/CheckButton";
import LikeButton from "../UI/Button/LikeButton";
import { BsChatLeftTextFill, BsBookmark } from "react-icons/bs";
import defaultAvatar from "../../assets/default_avatar.png";
import imageNotFound from "../../assets/image_notfound.png";
import { useState, useEffect, useContext } from "react";
import PostService from "../../services/PostService";
import { Context } from "../../index";
const Post = ({ post }) => {
  const { store } = useContext(Context);
  const [postLiked, setPostLiked] = useState(false);
  function likePost() {
    if (postLiked) post.likes_count--;
    else post.likes_count++;
    setPostLiked((state) => !state);
    PostService.likePost(post.id);
  }
  useEffect(() => {
    setPostLiked(post.userLike);
  }, []);
  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-12">
          <img
            className="object-cover w-12 h-12 rounded-full shadow"
            src={post.user.avatar_url}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultAvatar;
            }}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{post.user.nickname}</div>
          <div className="font-light text-xs">
            {new Date(post.created_at)
              .toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
              .toString()}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {post.attachments.map((at, index) => {
          if (at.type === "photo") {
            return (
              <img
                key={index}
                className="w-full rounded-lg"
                src={at.url}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = imageNotFound;
                }}
                alt="img"
              />
            );
          }
        })}
      </div>
      <div className="p-2 bg-back-lighter rounded-lg shadow mt-2 mb-4 w-11/12 self-center break-words">
        {post.description}
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 items-center flex-wrap">
          <LikeButton
            onClick={likePost}
            active={postLiked}
            count={post.likes_count}
          />

          <Button variant="outlined">
            <BsChatLeftTextFill size={"24px"} />
            <div>{post.comments_count}</div>
          </Button>
        </div>
        {/* <div>
          <CheckButton active={post.bookmark}>
            <BsBookmark size={"24px"} />
          </CheckButton>
        </div> */}
      </div>
    </div>
  );
};

export default Post;
