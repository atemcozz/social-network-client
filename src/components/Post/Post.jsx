import React from "react";
import Button from "../UI/Button/Button";
import CheckButton from "../UI/Button/CheckButton";
import LikeButton from "../UI/Button/LikeButton";
import {
  BsChatLeftTextFill,
  BsBookmark,
  BsThreeDotsVertical,
  BsBookmarkFill,
} from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
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
import Map from "../Map/Map";
import LinkText from "../UI/LinkText/LinkText";
import { Link } from "react-router-dom";
const Post = ({ post, onChange }) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
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
    window.open(`/post/${post.id}`);
  }
  function deletePost() {
    PostService.deletePost(post.id)
      .then(() => onChange())
      .catch();
  }
  function openUser() {
    window.open(`/user/${post.user.id}`);
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
          <Link to={`/user/${post.user.id}`} target={"_blank"}>
            <Avatar src={post.user.avatar_url} size="normal" />
          </Link>
          <div className="flex flex-col">
            <Link
              target={"_blank"}
              to={`/user/${post.user.id}`}
              className="font-semibold text-lg cursor-pointer hover:text-primary"
            >
              {post.user.nickname}
            </Link>
            {/* <div
              className="font-semibold text-lg cursor-pointer hover:text-primary"
              onClick={openUser}
            >
              {post.user.nickname}
            </div> */}
            <div className="font-light text-xs">
              {getDateFromSQL(post.created_at)}
            </div>
          </div>
        </div>
        <DotsDropdown>
          <DotsDropdown.Item
            icon={<IoMdOpen size={"24px"} />}
            onClick={openFullPost}
          >
            Открыть пост
          </DotsDropdown.Item>
          <DotsDropdown.Item
            icon={<MdContentCopy size={"24px"} />}
            onClick={copyLink}
          >
            Скопировать ссылку
          </DotsDropdown.Item>
          {store.isAuth && store.user.id === post.user.id && (
            <DotsDropdown.Item
              icon={<MdDeleteForever size={"24px"} />}
              onClick={deletePost}
            >
              Удалить пост
            </DotsDropdown.Item>
          )}
        </DotsDropdown>
      </div>

      <div className="flex flex-col gap-3 overflow-hidden">
        {post.title && (
          <div className="text-2xl font-bold pl-2 break-words">
            {post.title}
          </div>
        )}
        {post.description && (
          <div className="p-2 bg-back-lighter rounded-lg shadow w-full self-center break-words">
            <LinkText>{post.description}</LinkText>
          </div>
        )}

        {post.attachments[0] &&
          post.attachments.map((at, index) => {
            if (at.type === "photo")
              return (
                <Image
                  key={index}
                  src={at.url}
                  onClick={() => setImageModal(at.url)}
                />
              );

            if (at.type === "video")
              return (
                <video
                  key={index}
                  className="w-full rounded-lg"
                  src={at.url}
                  controls
                ></video>
              );
            return null;
          })}
      </div>
      {post.geo && (
        <>
          {showMap ? (
            <Button variant="outlined" onClick={() => setShowMap(false)}>
              <HiLocationMarker size="24px" />
              Скрыть карту
            </Button>
          ) : (
            <Button onClick={() => setShowMap(true)}>
              <HiLocationMarker size="24px" />
              Показать на карте
            </Button>
          )}
          {showMap && <Map locations={[post.geo]} center={post.geo} />}
        </>
      )}

      {post.tags && post.tags[0] && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag, index) => (
            <Link to={`/search/?tags=${tag}`} target={"_blank"} key={index}>
              <Tag>{tag}</Tag>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center ">
        <div className="flex gap-2 items-center flex-wrap">
          <LikeButton
            onClick={likePost}
            active={postLiked}
            count={post.likes_count}
          />

          {/* <Button variant="outlined" onClick={openFullPost}>
            <BsChatLeftTextFill size={"24px"} />
            <div>{post.comments_count}</div>
          </Button> */}
          <Link
            to={`/post/${post.id}`}
            className="rounded-lg flex border border-primary gap-2 text-primary p-2 hover:text-primary-darker"
            target={"_blank"}
          >
            <BsChatLeftTextFill size={"24px"} />
            <div>{post.comments_count}</div>
          </Link>
        </div>
        <Button
          variant={postSaved ? "primary" : "outlined"}
          onClick={() => setPostSaved((state) => !state)}
        >
          {postSaved ? (
            <BsBookmarkFill size={"24px"} />
          ) : (
            <BsBookmark size={"24px"} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Post;
