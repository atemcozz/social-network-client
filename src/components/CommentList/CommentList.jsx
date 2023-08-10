import React from 'react';
import Comment from "../Comment/Comment";

const CommentList = ({comments}) => {
  if (!comments?.length) return null;
  return (
    <div className={"flex flex-col gap-2 flex-1 overflow-auto"}>
      {comments.map(comment =>
        <Comment comment={comment} key={comment.id}/>,
      )}
    </div>
  );
};

export default CommentList;