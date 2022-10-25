import React from "react";
import { useState, useContext } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { MdSend } from "react-icons/md";
import PostService from "../../services/PostService";
import { Context } from "../../index";
import Tag from "./Tag/Tag";
import { CommentsContext } from "../FullPost/CommentSection";
import TextArea from "../UI/Input/TextArea";
const CommentInput = ({ onSend, reply }) => {
  const { store } = useContext(Context);
  const { setReply } = useContext(CommentsContext);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-1 sticky bg-back z-10 p-2 bottom-0 rounded-lg shadow left-0 right-0">
      {reply && (
        <div className="flex">
          <Tag deletable onDelete={() => setReply(null)}>
            Ответ {reply.user.nickname}
          </Tag>
        </div>
      )}
      <div className="flex gap-2 items-start">
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите комментарий"
          rows={1}
        />
        <Button
          onClick={() => {
            setText("");
            onSend({ body: text, belongsTo: reply?.id });
          }}
        >
          <MdSend size="24px" />
        </Button>
      </div>
    </div>
  );
};

export default CommentInput;
