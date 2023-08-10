import React from 'react';
import Image from "../UI/Image/Image";
import Map from "../Map/Map";
import MapView from "../Map/Yandex/MapView";

const PostContent = ({post}) => {
  if (!post) return null;
  return (
    <div>
      {post.content.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <div
                key={index}
                className={"overflow-x-hidden break-words"}
                dangerouslySetInnerHTML={{
                  __html: block.content,
                }}
              ></div>
            );
          case "image":
            return (
              <Image
                key={index}
                src={block.content}
                modal
              />
            );
          case "geo":
            return (
              <MapView key={index} location={block.content} zoom={12}/>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default PostContent;