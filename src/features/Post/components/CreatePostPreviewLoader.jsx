import React from 'react';
import Spinner from "../../../ui/Spinner/Spinner";
import Button from "../../../ui/Button/Button";
import {MdAddPhotoAlternate} from "react-icons/md";

export const CreatePostPreviewLoader = ({onClick, src, loading = false}) => {
  return (
    <div
      className="relative h-32 rounded-t-lg overflow-hidden bg-back cursor-pointer"
      onClick={onClick}
    >
      {loading && (
        <div className="h-full flex justify-center items-center">
          <Spinner/>
        </div>
      )}
      {src && !loading && (
        <div className="flex justify-center items-center">
          <img
            src={src}
            alt="preview"
            className="w-full object-cover object-top h-32 blur-sm"
          />

          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back to-transparent"></div>
          <img
            src={src}
            alt="preview"
            className="w-24 h-24 absolute rounded-lg shadow-xl object-cover"
          />
        </div>
      )}
      {!src && !loading && (
        <div className="h-full flex items-center justify-center">
          <Button variant="outlined">
            <MdAddPhotoAlternate size="64px"/>
          </Button>
        </div>
      )}
    </div>
  );
};

