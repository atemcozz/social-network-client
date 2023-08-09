import React from 'react';
import classNames from "classnames";

const PostContainer = ({children, className, ...props}) => {
  return (
    <div className={classNames(" rounded-lg shadow-md p-4 bg-back", className)} {...props}>
      {children}
    </div>
  );
};

export default PostContainer;