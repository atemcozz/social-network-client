import React from 'react';
import {Link} from "react-router-dom";
import Tag from "../UI/Tag/Tag";

const PostTags = ({tags}) => {
  if (!tags || !tags.length) {

    return null;
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag, index) => (
        tag &&
        (<Link to={`/search/?tags[]=${tag}`} key={index}>
          <Tag value={tag}/>
        </Link>)
      ))}
    </div>
  );
};

export default PostTags;