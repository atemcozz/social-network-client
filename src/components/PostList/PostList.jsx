import React from "react";
import Post from "../Post/Post";
import PostContainer from "../../features/post/PostContainer";

const PostList = ({posts, onChange}) => {
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
};

export default React.memo(PostList);
