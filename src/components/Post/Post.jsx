import React from "react";
import Button from "../UI/Button/Button";
import CheckButton from "../UI/Button/CheckButton";
import LikeButton from "../UI/Button/LikeButton";
import {
  BsChatLeftTextFill,
  BsBookmark,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoMdOpen } from "react-icons/io";
import { MdDeleteForever, MdContentCopy } from "react-icons/md";
import defaultAvatar from "../../assets/default_avatar.png";
import imageNotFound from "../../assets/image_notfound.png";
import { useState, useEffect, useContext, useRef } from "react";
import PostService from "../../services/PostService";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/routes";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import Modal from "../UI/Modal/Modal";
import Avatar from "../UI/Avatar/Avatar";
import getDateFromSQL from "../../utils/getDateFromSQL.js";
import Tag from "./Tag/Tag";
import Image from "../UI/Image/Image";
const Post = ({ post, onChange }) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [postLiked, setPostLiked] = useState(false);
  const [nsfwConfirmed, setNsfwConfirmed] = useState(false);
  const [isNsfw, setIsNsfw] = useState(post.nsfw);
  const [imageModal, setImageModal] = useState(false);
  function likePost() {
    if (store.isAuth) {
      if (postLiked) post.likes_count--;
      else post.likes_count++;
      setPostLiked((state) => !state);
      PostService.likePost(post.id);
    } else {
      navigate(LOGIN_ROUTE);
    }
  }
  function copyLink() {
    if (typeof window !== "undefined") {
      const url = `${window.location.protocol}//${window.location.host}/post/${post.id}`;
      const textField = document.createElement("textarea");
      textField.innerText = url;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    }
  }
  function openFullPost() {
    navigate(`/post/${post.id}`);
  }
  function deletePost() {
    PostService.deletePost(post.id)
      .then(() => onChange())
      .catch();
  }
  function openUser() {
    navigate(`/user/${post.user.id}`);
  }
  useEffect(() => {
    setPostLiked(post.userLike);
  }, []);

  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back gap-3">
      {imageModal && (
        <Modal
          content={
            <img
              className="w-[90vw] h-auto md:h-[80vh] md:w-auto rounded-lg"
              alt="img"
              src={imageModal}
            />
          }
          active={imageModal}
          onBgClick={() => setImageModal(null)}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Avatar
            src={post.user.avatar_url}
            size="normal"
            pointer
            onClick={openUser}
          />
          <div className="flex flex-col">
            <div
              className="font-semibold text-lg cursor-pointer hover:text-primary"
              onClick={openUser}
            >
              {post.user.nickname}
            </div>
            <div className="font-light text-xs">
              {getDateFromSQL(post.created_at)}
            </div>
          </div>
        </div>
        <DotsDropdown
          items={[
            {
              name: "Открыть пост",
              icon: <IoMdOpen size={"24px"} />,
              onClick: openFullPost,
            },
            {
              name: "Скопировать ссылку",
              icon: <MdContentCopy size={"24px"} />,
              onClick: copyLink,
            },
            store.isAuth &&
              store.user?.id === post.user?.id && {
                name: "Удалить пост",
                icon: <MdDeleteForever size={"24px"} />,
                onClick: deletePost,
              },
          ]}
        />
      </div>
      {post.description && (
        <div className="p-2 bg-back-lighter rounded-lg shadow w-11/12 self-center break-words">
          {post.description}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {isNsfw && !nsfwConfirmed && (
          <div className="flex justify-center items-center flex-col bg-gray-500 rounded-lg text-white h-80 gap-5">
            <div className="text-7xl text-center font-bold">18+</div>
            <div className="flex items-center flex-col">
              <div className="text-xl text-center">
                Внимание!<br></br>Данный пост содержит
              </div>
              <div className="text-2xl font-bold">нежелательный контент</div>
            </div>

            <Button className={"shadow"} onClick={() => setNsfwConfirmed(true)}>
              Показать
            </Button>
          </div>
        )}
        {(nsfwConfirmed || !isNsfw) &&
          post.attachments[0] &&
          post.attachments.map((at, index) => {
            switch (at.type) {
              case "photo":
                return (
                  <Image
                    key={index}
                    src={at.url}
                    onClick={() => setImageModal(at.url)}
                  />
                );

              case "video":
                return (
                  <video
                    key={index}
                    className="w-full rounded-lg"
                    src={at.url}
                    controls
                  ></video>
                );

              case "audio":
                return (
                  <audio
                    className="w-full rounded-lg bg-primary"
                    controls
                    key={index}
                    src={at.url}
                  ></audio>
                );

              default:
                break;
            }
          })}
      </div>
      {post.tags && post.tags[0] && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      )}
      {/* <div className="flex flex-wrap gap-1.5">
        <Tag>Природа</Tag>
      </div> */}
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 items-center flex-wrap">
          <LikeButton
            onClick={likePost}
            active={postLiked}
            count={post.likes_count}
          />

          <Button variant="outlined" onClick={openFullPost}>
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
