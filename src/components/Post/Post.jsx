import React from "react";
import Button from "../UI/Button/Button";
import CheckButton from "../UI/Button/CheckButton";
import LikeButton from "../UI/Button/LikeButton";
import { BsChatLeftTextFill, BsBookmark } from "react-icons/bs";

const Post = ({ post }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-12">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src={post.userAvatarURL}
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{post.userNickname}</div>
          <div className="font-light text-xs">{post.geo}</div>
        </div>
      </div>

      <div>
        <img className="w-full rounded-lg" src={post.photoURL} alt="img" />
      </div>
      <div className="p-2 bg-back-lighter rounded-lg shadow -mt-6 mb-4 w-11/12 self-center break-words">
        {post.description}
      </div>
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 items-center flex-wrap">
          <LikeButton active={post.liked} count={post.likesCount} />

          <Button variant="outlined">
            <BsChatLeftTextFill size={"24px"} />
            <div>{post.commentsCount}</div>
          </Button>
        </div>
        <div>
          <CheckButton active={post.bookmark}>
            <BsBookmark size={"24px"} />
          </CheckButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
