import React, { useContext } from "react";
import Avatar from "../UI/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import getDateFromSQL from "../../utils/getDateFromSQL";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import PostService from "../../services/PostService";
import { MdDeleteForever } from "react-icons/md";
import { Context } from "../../index";
import LinkText from "../UI/LinkText/LinkText";
import { Link } from "react-router-dom";
import { BsArrowUpSquare, BsReplyFill } from "react-icons/bs";
import { useState } from "react";
import Button from "../UI/Button/Button";
import { CommentsContext } from "../FullPost/CommentSection";

const Comment = ({ comment, onDelete, depth = 0 }) => {
  const { store } = useContext(Context);
  const { setReply } = useContext(CommentsContext);
  const [branchVisible, setBranchVisible] = useState(true);
  const [branchHover, setBranchHover] = useState(false);

  const navigate = useNavigate();
  return (
    <div name={comment.id} className={`flex flex-col gap-2 min-w-max`}>
      <div className="flex p-2 bg-back shadow rounded-lg items-start justify-between">
        <div className="flex gap-2">
          <Link to={`/user/${comment.user.id}`} target={"_blank"}>
            <Avatar src={comment.user.avatar_url} size="normal" />
          </Link>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                target={"_blank"}
                to={`/user/${comment.user.id}`}
                className="font-semibold text-base cursor-pointer hover:text-primary"
              >
                {comment.user.nickname}
              </Link>

              {/* <div className="font-semibold text-base cursor-pointer hover:text-primary">
              {comment.user.nickname}
            </div> */}
              <div className="font-light text-xs leading-3">
                {getDateFromSQL(comment.created_at)}
              </div>
            </div>
            <div className="break-words max-w-md">
              <LinkText>{comment.body}</LinkText>
            </div>
          </div>
        </div>

        <DotsDropdown>
          {store.user?.id === comment.user.id && (
            <DotsDropdown.Item
              icon={<MdDeleteForever size={"24px"} />}
              onClick={() => onDelete(comment.id)}
            >
              Удалить
            </DotsDropdown.Item>
          )}
          {store.isAuth && (
            <DotsDropdown.Item
              icon={<BsReplyFill size={"24px"} />}
              onClick={() => setReply(comment)}
            >
              Ответить
            </DotsDropdown.Item>
          )}
          {branchVisible && comment.children?.length > 0 && (
            <DotsDropdown.Item
              icon={<BsArrowUpSquare size={"24px"} />}
              onClick={() => setBranchVisible(false)}
            >
              Скрыть ответы
            </DotsDropdown.Item>
          )}
        </DotsDropdown>
      </div>
      {!branchVisible && (
        <Button variant="outlined" onClick={() => setBranchVisible(true)}>
          Показать ответы
        </Button>
      )}
      {comment.children?.length > 0 && (
        <div
          className={`${!branchVisible && "hidden"}
           ${
             branchHover ? "border-primary" : "border-secondary-darker"
           } ml-1 pl-2 border-l-2  flex flex-col gap-2 relative`}
        >
          <div
            onMouseOver={(e) => {
              e.stopPropagation();

              setBranchHover(true);
            }}
            onMouseOut={(e) => {
              e.stopPropagation();
              setBranchHover(false);
            }}
            className="cursor-pointer absolute inset-y-0 -left-2 w-4"
            onClick={() => setBranchVisible(false)}
          >
            {/* <div
              className={`${
                branchHover ? "text-primary" : "text-secondary-darker"
              } absolute top-6  bg-back-darker`}
            >
              <BsArrowUpSquare />
            </div> */}
          </div>

          {comment.children.map((child, index) => (
            <Comment
              key={index}
              comment={child}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
