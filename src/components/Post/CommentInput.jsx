import React from "react";
import { useState, useContext } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { MdSend } from "react-icons/md";
import PostService from "../../services/PostService";
import { Context } from "../../index";
import Tag from "./Tag/Tag";
import { CommentsContext } from "../FullPost/CommentSection";
const CommentInput = ({ onSend, reply }) => {
  const { store } = useContext(Context);
  const { setReply } = useContext(CommentsContext);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-1">
      {reply && (
        <div className="flex">
          <Tag deletable onDelete={() => setReply(null)}>
            Ответ {reply.user.nickname}
          </Tag>
        </div>
      )}
      <div className="flex gap-2 ">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите комментарий"
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
