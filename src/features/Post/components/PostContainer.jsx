import React from 'react';
import classNames from "classnames";

export const PostContainer = ({children, className, ...props}) => {
  return (
    <article className={classNames("rounded-lg shadow-md p-4 bg-back", className)} {...props}>
      {children}
    </article>
  );
};
