import React from 'react';
import {Comment} from "./Comment";

export const CommentList = ({comments, depth = 0}) => {
  if (!comments?.length) return null;
  return (
    <div className={"flex flex-col gap-2"}>
      {comments.map(comment =>
        <Comment comment={comment} key={comment.id} depth={depth}/>,
      )}
    </div>
  );
};

export default CommentList;