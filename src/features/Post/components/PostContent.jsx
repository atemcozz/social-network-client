import React from 'react';
import Image from "../../../ui/Image/Image";
import {MapRouteView, MapView} from "../../Map";
import {API_KEY} from "../../Map/consts/consts";
import {YMaps} from "@pbe/react-yandex-maps";

export const PostContent = ({post}) => {
  if (!post) return null;
  return (
    <div>
      <YMaps
        query={{
          load: "package.full",
          apikey: API_KEY,
        }}
      >
        {post.content.map((block, index) => {
          switch (block.type) {
            case "text":
              return (
                <div
                  key={index}
                  className={"py-2 overflow-x-hidden break-words"}
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
            case "geo_route":
              return (
                <MapRouteView key={index} locations={block.content}/>
              );

            default:
              return null;
          }
        })}
      </YMaps>
    </div>
  );
};
