import React from "react";
import Button from "../UI/Button/Button";

import LikeButton from "../UI/Button/LikeButton";
import { BsChatLeftTextFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdOpen } from "react-icons/io";
import { MdDeleteForever, MdContentCopy } from "react-icons/md";

import { useState, useEffect } from "react";
import PostService from "../../services/PostService";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import Modal from "../UI/Modal/Modal";
import Avatar from "../UI/Avatar/Avatar";
import * as utils from "../../utils/utils";
import Tag from "./Tag/Tag";
import Image from "../UI/Image/Image";
import Map from "../Map/Map";
import { Link } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import linkifyText from "../../utils/linkifyText";
const Post = ({ post, onChange, contentExposed = false }) => {
  const navigate = useNavigate();
  const store = useStore();
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [exposed, setExposed] = useState(contentExposed);
  function likePost() {
    if (store.isAuth) {
      if (postLiked) post.likes_count--;
      else post.likes_count++;
      setPostLiked((state) => !state);
      PostService.likePost(post.id);
    } else {
      navigate("/login");
    }
  }
  function copyLink() {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/post/${post.id}`
    );
    // if (typeof window !== "undefined") {
    //   const url = `${window.location.protocol}//${window.location.host}/post/${post.id}`;
    //   const textField = document.createElement("textarea");
    //   textField.innerText = url;
    //   document.body.appendChild(textField);
    //   textField.select();
    //   document.execCommand("copy");
    //   textField.remove();
    // }
  }
  function openFullPost() {
    window.open(`/post/${post.id}`);
  }
  function deletePost() {
    PostService.deletePost(post.id)
      .then(() => onChange())
      .catch();
  }
  function addBookmark() {
    if (store.isAuth) {
      UserService.addBookmark(post.id);
      setPostSaved((state) => !state);
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    setPostLiked(post.userLike);
    setPostSaved(post.userBookmark);
  }, [post]);

  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back gap-3">
      {imageModal && (
        <Modal active={imageModal} onBgClick={() => setImageModal(null)}>
          <img
            className="w-[90vw] h-auto md:h-[80vh] md:w-auto rounded-lg"
            alt="img"
            src={imageModal}
          />
        </Modal>
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
              {utils.getDateFromSQL(post.created_at)}
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
          <div className="text-2xl font-bold break-words">{post.title}</div>
        )}
        <Image src={post.preview} onClick={() => setImageModal(post.preview)} />
        {!exposed && (
          <Button onClick={() => setExposed(true)} variant={"outlined"}>
            <FaArrowDown size={"24px"} /> Показать полностью
          </Button>
        )}

        {exposed && (
          <>
            {JSON.parse(post.content).map((block, index) => {
              switch (block.type) {
                case "text":
                  return (
                    <div
                      key={index}
                      className={"overflow-x-hidden break-words"}
                      dangerouslySetInnerHTML={{
                        __html: block.content,
                      }}
                    ></div>
                  );
                case "image":
                  return (
                    <Image
                      key={index}
                      src={block.content}
                      onClick={() => setImageModal(block.content)}
                    />
                  );
                case "geo":
                  return (
                    <Map
                      key={index}
                      locations={[block.content]}
                      center={block.content}
                    />
                  );

                default:
                  return null;
              }
            })}
            <Button onClick={() => setExposed(false)} variant={"secondary"}>
              <FaArrowUp size={"24px"} /> Скрыть
            </Button>
          </>
        )}
      </div>

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
          onClick={addBookmark}
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
