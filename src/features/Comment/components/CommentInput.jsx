import React, {useState} from "react";

import Button from "../../../ui/Button/Button";
import {MdSend} from "react-icons/md";
import TextArea from "../../../ui/TextArea/TextArea";
import Avatar from "../../../ui/Avatar/Avatar";
import store from "../../../store";

export const CommentInput = ({onSend, parent = null}) => {

  const [text, setText] = useState("");

  return (
    <div className="flex flex-1 items-start gap-2 sticky bg-back p-2 rounded-lg shadow">
      <Avatar size={"small"} src={store.user.avatar_url}/>
      <div className="flex flex-col gap-2 items-start flex-1">
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите комментарий"
          autoExpand

        />
      </div>
      <Button
        onClick={() => {
          setText("");
          onSend({body: text, answer_to: parent ? parent?.id : null});
        }}
      >
        <MdSend size="24px"/>
      </Button>

    </div>
  );
};

