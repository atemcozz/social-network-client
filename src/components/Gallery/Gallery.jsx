import React from "react";
import { useState } from "react";
import { MdImageNotSupported } from "react-icons/md";
const Gallery = ({ posts, children }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 bg-back p-2">
      {children}
    </div>
  );
};
const Item = ({ post, onClick }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  return (
    <div
      className="md:rounded-lg rounded aspect-square shadow cursor-pointer hover:brightness-50 ease-in duration-100 overflow-hidden"
      onClick={onClick}
    >
      {loading && <div className="h-full bg-secondary"></div>}
      {error && (
        <div className="h-full bg-secondary flex justify-center items-center">
          <MdImageNotSupported size={"48px"} />
        </div>
      )}
      {post.attachments[0].type === "photo" && !error && (
        <img
          className={`h-full w-full object-cover ${
            loading ? "hidden" : "inline"
          }`}
          src={post.attachments[0].url}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          alt="img"
          onLoad={() => setLoading(false)}
        />
      )}
      {post.attachments[0].type === "video" && !error && (
        <video
          onLoadedData={() => setLoading(false)}
          className={`h-full w-full object-cover pointer-events-none ${
            loading ? "hidden" : "inline"
          }`}
          src={post.attachments[0].url}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        ></video>
      )}
    </div>
  );
};
Gallery.Item = Item;
export default Gallery;
