import React, { useContext } from "react";
import Avatar from "../UI/Avatar/Avatar";
import DotsDropdown from "../UI/Dropdown/DotsDropdown/DotsDropdown";
import { MdDeleteForever } from "react-icons/md";
import LinkedText from "../UI/LinkedText/LinkedText";
import { Link } from "react-router-dom";
import { BsArrowUpSquare, BsReplyFill } from "react-icons/bs";
import { useState } from "react";
import Button from "../UI/Button/Button";
import { CommentsContext } from "../CommentSection/CommentSection";
import useStore from "../../hooks/useStore";
import classNames from "classnames";
import getDateFromSQL from "../../utils/getDateFromSQL";

const Comment = ({ comment, onDelete, depth = 0 }) => {
  const store = useStore();
  const { setReply } = useContext(CommentsContext);
  const [branchVisible, setBranchVisible] = useState(true);
  // const [branchHover, setBranchHover] = useState(false);
  function getNestedCommentsCount(childComment) {
    let count = 0;
    childComment.children?.map((c) => (count += getNestedCommentsCount(c) + 1));
    return count;
  }
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
              <div className="font-light text-xs ">
                {getDateFromSQL(comment.created_at)}
              </div>
            </div>
            <div className="break-words max-w-md">{comment.body}</div>
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
          Показать ответы {`(${getNestedCommentsCount(comment)})`}
        </Button>
      )}
      {comment.children?.length > 0 && (
        <div
          className={classNames(
            "ml-1 pl-2 border-l-2  flex flex-col gap-2 relative border-secondary-darker",
            {
              hidden: !branchVisible,
            } /*,branchHover ? "border-primary" : "border-secondary-darker"*/
          )}
        >
          <div
            // onMouseOver={(e) => {
            //   e.stopPropagation();

            //   setBranchHover(true);
            // }}
            // onMouseOut={(e) => {
            //   e.stopPropagation();
            //   setBranchHover(false);
            // }}
            // onClick={() => setBranchVisible(false)}
            className=" absolute inset-y-0 -left-2 w-4"
          ></div>

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
