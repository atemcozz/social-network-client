import React from "react";
import CommentInput from "../Post/CommentInput";

import { useState } from "react";

import Comment from "../Post/Comment";
import { createContext } from "react";

import useStore from "../../hooks/useStore";

export const CommentsContext = createContext();
const CommentSection = ({ comments, error, onSend, onDelete }) => {
  const store = useStore();
  const [reply, setReply] = useState();
  function arrayToTree(arr, belong = null) {
    const top = [];
    arr.forEach((el) => {
      if (
        el.belongsTo === belong ||
        (!el.hasOwnProperty("belongsTo") && belong === null)
      ) {
        el.children = arrayToTree(arr, el.id);
        top.push(el);
      }
    });
    return top;
  }
  return (
    <CommentsContext.Provider value={{ reply, setReply }}>
      <div className="flex flex-col gap-2 relative">
        {error && (
          <>
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              В процессе загрузки комментариев произошла ошибка. Попробуйте
              перезагрузить страницу.
            </div>
            <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
              {error.message}
            </div>
          </>
        )}
        <div className="flex flex-col gap-2 overflow-auto px-4">
          {comments?.length > 0 ? (
            arrayToTree(comments).map((comment, index) => (
              <Comment key={index} comment={comment} onDelete={onDelete} />
            ))
          ) : (
            <div className="rounded-lg p-2 bg-back-lighter">
              Никто ещё не оставил комментариев, станьте первым!
            </div>
          )}
        </div>
        {store.isAuth && <CommentInput onSend={onSend} reply={reply} />}
      </div>
    </CommentsContext.Provider>
  );
};

export default CommentSection;
