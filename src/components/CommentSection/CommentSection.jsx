import React, {useMemo} from "react";
import CommentInput from "../CommentInput/CommentInput";

import {useState} from "react";

import Comment from "../Comment/Comment";
import {createContext} from "react";
import ErrorMessage from "../UI/ErrorMessage/ErrorMessage";
import store from "../../store";
import CommentList from "../CommentList/CommentList";
import CommentService from "../../services/CommentService";

export const CommentsContext = createContext();
const CommentSection = ({comments, error, onSend, onDelete}) => {

  const template = [
    {
      user: {
        id: 1,
        nickname: "atemcozz",
        avatar_url: null,
      },
      id: 0,
      body: "Test",
    },
    {
      user: {
        id: 1,
        nickname: "atemcozz",
        avatar_url: null,
      },
      id: 1,
      body: "Test",
      answer_to: 0,
    },
    {
      user: {
        id: 1,
        nickname: "atemcozz",
        avatar_url: null,
      },
      id: 2,
      body: "Test",
      answer_to: 1,
    },
    {
      user: {
        id: 1,
        nickname: "atemcozz",
        avatar_url: null,
      },
      id: 3,
      body: "Test",
      answer_to: 1,
    },
  ];
  const commentsByParentID = useMemo(() => {
    if (!comments) return null;
    const group = {};
    comments.forEach(comment => {
      const parentID = comment.answer_to === undefined ? null : comment.answer_to;
      group[parentID] = group[parentID] || [];
      group[parentID].push(comment);

    });
    return group;
  }, [comments]);

  function getReplies(parentId) {
    return commentsByParentID[parentId];
  }

  function getRepliesCount(parentID) {
    let count = 0;
    const replies = getReplies(parentID);
    replies?.forEach(reply => {
      count += getRepliesCount(reply.id) + 1;
    });
    return count;
  }

  function sendCommentAndScroll(comment) {
    onSend(comment);
    const replies = getReplies(comment.answer_to);
    const lastChild = replies?.[replies.length - 1];
    if (lastChild?.id) {
      const target = document.querySelector(`[data-id="${lastChild.id}"]`);
      target.scrollIntoView({
        behavior: "smooth",
        block: 'center',
        inline: 'center',
      });
      // const elTop = target.offsetTop;
      // const offset = window.innerHeight / 2;
      // window.scrollTo({top: elTop + offset, behavior: "smooth"});
    }

  }

  async function likeComment(comment) {
    await CommentService.likeComment(comment.id);
  }

  return (
    <CommentsContext.Provider
      value={{
        rootComments: commentsByParentID[null],
        getReplies,
        getRepliesCount,
        sendComment: sendCommentAndScroll,
        deleteComment: onDelete,
        likeComment,
      }}>
      <div className="flex flex-col gap-2">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {store.auth &&
          <>
            {!comments.length > 0 && <div className="rounded-lg p-2 bg-back-lighter">
              Никто ещё не оставил комментариев, станьте первым!
            </div>}
            <CommentInput onSend={sendCommentAndScroll}/>
          </>}

        <div className="mb-36 overflow-auto">
          {comments?.length > 0 && <CommentList comments={commentsByParentID[null]}/>}
        </div>


      </div>
    </CommentsContext.Provider>
  );
};

export default CommentSection;
