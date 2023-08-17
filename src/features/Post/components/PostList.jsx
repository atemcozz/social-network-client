import React from "react";
import {Post} from "./Post";
import {PostContainer} from "./PostContainer";
import NoContentMessage from "../../../components/NoContentMessage/NoContentMessage";

export const PostList = React.memo(({posts, onChange}) => {
  return (
    <div className="flex flex-col gap-4">
      {(!posts || !posts.length) && (
        <NoContentMessage/>
      )}
      {posts?.map((post, index) => (
        <PostContainer key={post.id}>
          <Post content={post} onChange={onChange}/>
        </PostContainer>
      ))}
    </div>
  );
});
