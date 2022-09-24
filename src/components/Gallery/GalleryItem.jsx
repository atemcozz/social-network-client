import React from "react";
import { useState } from "react";
import imageNotFound from "../../assets/image_notfound.png";
const GalleryItem = ({ post, onClick }) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className="rounded-sm md:rounded-lg aspect-square cursor-pointer hover:brightness-50 ease-in duration-100 overflow-hidden"
      onClick={onClick}
    >
      {loading && <div className="h-full bg-secondary"></div>}
      <img
        className={`h-full object-cover ${loading ? "hidden" : "inline"}`}
        src={post.attachments[0].url}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = imageNotFound;
        }}
        alt="img"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default GalleryItem;
