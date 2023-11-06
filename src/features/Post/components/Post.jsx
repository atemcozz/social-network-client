import React, {createContext, useState} from "react";
import Button from "../../../ui/Button/Button";

import {BsBookmark, BsBookmarkFill, BsChatLeftTextFill, BsHeart, BsHeartFill} from "react-icons/bs";
import {IoMdOpen} from "react-icons/io";
import {MdContentCopy, MdDeleteForever} from "react-icons/md";
import {PostService} from "../api/PostService";
import {Link, useNavigate} from "react-router-dom";
import DotsDropdown from "../../../ui/Dropdown/DotsDropdown/DotsDropdown";
import Avatar from "../../../ui/Avatar/Avatar";
import Image from "../../../ui/Image/Image";
import store from "../../../store";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import getDateFromSQL from "../../../utils/getDateFromSQL";
import {PostContent} from "./PostContent";
import {PostTags} from "./PostTags";
import {PostModal} from "./PostModal";
import {ButtonWithAuth} from "../../Auth";

export const PostContext = createContext(null);
export const Post = ({content, onChange, recursive = true, contentExposed = false}) => {
  const [post, setPost] = useState(content);
  const navigate = useNavigate();
  const [exposed, setExposed] = useState(contentExposed);
  const [modal, setModal] = useState(false);

  async function likePost() {
    if (post.user_like)
      updatePost({
        likes_count: Number(post.likes_count) - 1,
        user_like: false,
      });
    else
      updatePost({
        likes_count: Number(post.likes_count) + 1,
        user_like: true,
      });

    return PostService.likePost(post.id);
  }

  function addBookmark() {
    updatePost({user_saved: !post.user_saved});
    return PostService.addBookmark(post.id);
  }

  function copyLink() {
    return navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/post/${post.id}`,
    );
  }

  function openFullPost() {
    setModal(true);
  }

  function deletePost() {
    PostService.deletePost(post.id)
      .then(() => onChange())
      .catch();
  }


  function updatePost(state) {
    setPost({...post, ...state});
  }


  if (!post) {
    return null;
  }
  return (
    <PostContext.Provider value={{updatePost}}>
      <div className="flex flex-col gap-3">
        {modal &&
          <PostModal post={post} onCancel={() => setModal(false)}/>
        }
        <div className="flex items-center justify-between">

          <div className="flex gap-2">
            <Link to={`/user/${post.user_id}`}>
              <Avatar src={post.user_avatar_url} size="normal"/>
            </Link>
            <div className="flex flex-col">
              <Link

                to={`/user/${post.user_id}`}
                className="font-semibold text-lg cursor-pointer hover:text-primary"
              >
                {post.user_nickname}
              </Link>
              <div className="font-light text-xs">
                {getDateFromSQL(post.created_at)}
              </div>
            </div>
          </div>
          <DotsDropdown>
            {recursive &&
              <DotsDropdown.Item
                icon={<IoMdOpen size={"24px"}/>}
                onClick={openFullPost}
              >
                Открыть пост
              </DotsDropdown.Item>}
            <DotsDropdown.Item
              icon={<MdContentCopy size={"24px"}/>}
              onClick={copyLink}
            >
              Скопировать ссылку
            </DotsDropdown.Item>
            {store.auth && store.user.id === post.user_id && (
              <DotsDropdown.Item
                icon={<MdDeleteForever size={"24px"}/>}
                onClick={deletePost}
              >
                Удалить пост
              </DotsDropdown.Item>
            )}
          </DotsDropdown>
        </div>

        <div className="flex flex-col gap-3 overflow-hidden">
          <h1 className="text-2xl font-bold break-words">{post.title}</h1>
          <Image src={post.preview} modal/>
          {!exposed && (
            <Button onClick={() => setExposed(true)} variant={"outlined"}>
              <FaArrowDown size={"24px"}/> Показать полностью
            </Button>
          )}
          {exposed && (
            <>
              <PostContent post={post}/>
              <Button onClick={() => setExposed(false)} variant={"secondary"}>
                <FaArrowUp size={"24px"}/> Скрыть
              </Button>
            </>
          )}
        </div>

        <PostTags tags={post.tags}/>
        <div className="flex justify-between items-center ">
          <div className="flex gap-2 items-center flex-wrap">
            <ButtonWithAuth variant={post.user_like ? "like" : "outlined"}
                            onClick={likePost}>
              {post.user_like ? <BsHeartFill size={"24px"}/> : <BsHeart size={"24px"}/>}
              {post.likes_count}
            </ButtonWithAuth>
            {recursive &&
              <Link to={`/post/${post.id}`}>
                <Button
                  variant={"outlined"}
                  tabIndex={"-1"}
                >
                  <BsChatLeftTextFill size={"24px"}/>
                  <div>{post.comments_count}</div>
                </Button>
              </Link>
            }
          </div>
          <ButtonWithAuth
            variant={post.user_saved ? "primary" : "outlined"}
            onClick={addBookmark}
          >
            {post.user_saved ? (
              <BsBookmarkFill size={"24px"}/>
            ) : (
              <BsBookmark size={"24px"}/>
            )}
          </ButtonWithAuth>
        </div>
      </div>
    </PostContext.Provider>
  );
};
