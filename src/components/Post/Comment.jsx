import React, { useContext } from "react";
import Avatar from "../UI/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import getDateFromSQL from "../../utils/getDateFromSQL";
import DotsDropdown from "../UI/Dropdown/DotsDropdown";
import PostService from "../../services/PostService";
import { MdDeleteForever } from "react-icons/md";
import { Context } from "../../index";
const Comment = ({ comment, onChange }) => {
  const { store } = useContext(Context);
  async function deleteComment() {
    await PostService.deleteComment(comment.id)
      .then(() => onChange())
      .catch((e) => console.error(e));
  }
  const navigate = useNavigate();
  return (
    <div className="flex p-2 bg-back shadow rounded-lg items-start justify-between">
      <div className="flex gap-2">
        <Avatar
          size="small"
          src={comment.user.avatar_url}
          pointer
          onClick={() => navigate(`/user/${comment.user.id}`)}
        />
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <div className="font-semibold text-base cursor-pointer hover:text-primary">
              {comment.user.nickname}
            </div>
            <div className="font-light text-xs leading-3">
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
            onClick={deleteComment}
          >
            Удалить
          </DotsDropdown.Item>
        )}
      </DotsDropdown>
    </div>
  );
};

export default Comment;
