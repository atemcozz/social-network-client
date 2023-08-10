import React, {useContext, useEffect, useMemo} from "react";
import Avatar from "../UI/Avatar/Avatar";
import DotsDropdown from "../UI/Dropdown/DotsDropdown/DotsDropdown";
import {MdDeleteForever} from "react-icons/md";
import LinkedText from "../UI/LinkedText/LinkedText";
import {Link} from "react-router-dom";
import {BsArrowUpSquare, BsReplyFill} from "react-icons/bs";
import {useState} from "react";
import Button from "../UI/Button/Button";
import {CommentsContext} from "../CommentSection/CommentSection";
import store from "../../store";
import classNames from "classnames";
import getDateFromSQL from "../../utils/getDateFromSQL";
import CommentList from "../CommentList/CommentList";
import CommentInput from "../CommentInput/CommentInput";
import {FaRegHeart, FaHeart} from "react-icons/fa";

const Comment = ({comment}) => {
  const {getReplies, getRepliesCount, sendComment, deleteComment, likeComment} = useContext(CommentsContext);
  const childComments = getReplies(comment.id);
  const [expanded, setExpanded] = useState(true);
  const [replyOpened, setReplyOpened] = useState(false);
  const [liked, setLiked] = useState(comment?.user_like);
  const [likesCount, setLikesCount] = useState(Number(comment?.likes_count));

  function handleCommentLike() {
    if (!store.auth) return;
    if (liked) {
      setLiked(false);
      setLikesCount(s => s - 1);
    } else {
      setLiked(true);
      setLikesCount(s => s + 1);
    }

    likeComment(comment);
  }

  useEffect(() => {
    if (!expanded) {
      setExpanded(true);
    }
  }, [replyOpened]);
  useEffect(() => {
    if (!expanded) {
      const target = document.querySelector(`[data-id="${comment.id}"]`);
      target.scrollIntoView({
        behavior: "smooth",
        block: 'center',
        inline: 'center',
      });
    }
  }, [expanded]);
  return (
    <>
      <div data-id={comment.id} className={`flex flex-col gap-2 flex-1`}>
        <div className="flex p-2 bg-back shadow rounded-lg items-start justify-between">
          <div className="flex gap-2 flex-1 relative  w-full">
            <Link to={`/user/${comment.user_id}`}>
              <Avatar src={comment.user_avatar_url} size="normal"/>
            </Link>
            <div className="flex flex-col flex-1 items-stretch overflow-hidden">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={`/user/${comment.user_id}`}
                  className="font-semibold text-base cursor-pointer hover:text-primary"
                >
                  {comment.user_nickname}
                </Link>

              </div>
              <div className="break-words">{comment.body}</div>
              <div className={"flex justify-between items-center"}>
                <div className={"flex gap-2"}>
                  {store.auth &&
                    <span className={"text-primary hover:underline cursor-pointer select-none"}
                          onClick={() => setReplyOpened(s => !s)}>Ответить</span>}
                  {store.auth && store.user?.id === comment.user_id && (
                    <span className={"text-danger hover:underline cursor-pointer select-none"}
                          onClick={() => deleteComment(comment.id)}>Удалить</span>)}
                </div>
                <span
                  className={classNames("flex items-center gap-1 cursor-pointer select-none", liked ? "text-like hover:text-danger" : "text-primary hover:text-primary-darker")}
                  onClick={handleCommentLike}>
                    {liked
                      ?
                      <FaHeart className={"mt-0.5"} size={"16px"}/>
                      :
                      <FaRegHeart className={"mt-0.5"} size={"16px"}/>
                    }
                  {likesCount}
                  </span>

              </div>
            </div>
            <span className="font-light text-xs absolute top-0 right-0">
              {getDateFromSQL(comment.created_at)}
            </span>
          </div>


        </div>
      </div>
      {replyOpened && expanded &&
        <div className={"flex"}>
          <div className={"pl-2 md:pl-4"}></div>
          <CommentInput parent={comment} onSend={(data) => {
            sendComment(data);
            setReplyOpened(false);
          }}/>
        </div>
      }
      {childComments?.length && expanded &&
        <div className={"flex"}>
          <div className={"pl-2 md:pl-4 border-l-2 border-secondary-darker hover:border-primary cursor-pointer"}
               onClick={() => setExpanded(false)}></div>
          <CommentList comments={childComments}/>
        </div>}
      {!expanded &&
        <Button variant={"outlined"} onClick={() => setExpanded(true)}>Показать ответы
          ({getRepliesCount(comment.id)})</Button>
      }
    </>
  );
};

export default Comment;
