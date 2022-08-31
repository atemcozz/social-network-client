import React from "react";
import { useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { MdSend } from "react-icons/md";
import PostService from "../../services/PostService";
const CommentInput = ({ post, onSend }) => {
  const [text, setText] = useState("");
  async function sendComment() {
    setText("");
    await PostService.createComment({
      post_id: post.id,
      user_id: post.user.id,
      body: text,
    })
      .then(() => onSend())
      .catch();
  }
  return (
    <div className="flex gap-2 ">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите комментарий"
      />
      <Button onClick={sendComment}>
        <MdSend size="24px" />
      </Button>
    </div>
  );
};

export default CommentInput;
