import React from "react";
import Post from "../Post/Post";
const PostList = ({ posts, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts?.length === 0 && (
        <div className="font-bold text-xl text-center">Здесь ничего нет</div>
      )}
      {posts?.map((post, index) => (
        <Post key={post.id} post={post} onChange={onChange} />
      ))}
    </div>
  );
};

export default React.memo(PostList);
