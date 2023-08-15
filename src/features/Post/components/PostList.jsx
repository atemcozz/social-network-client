import React from "react";
import {Post} from "./Post";
import {PostContainer} from "./PostContainer";

export const PostList = React.memo(({posts, onChange}) => {
  return (
    <div className="flex flex-col gap-4">
      {(!posts || !posts.length) && (
        <div className="font-bold text-xl text-center">Здесь ничего нет</div>
      )}
      {posts?.map((post, index) => (
        <PostContainer key={post.id}>
          <Post content={post} onChange={onChange}/>
        </PostContainer>
      ))}
    </div>
  );
});
