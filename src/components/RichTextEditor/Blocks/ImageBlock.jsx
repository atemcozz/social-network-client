import React, {useRef, useState} from "react";
import Button from "../../UI/Button/Button";

import Spinner from "../../UI/Spinner/Spinner";
import Image from "../../UI/Image/Image";
import BlockEditActions from "./BlockEditActions";


const ImageBlock = ({
                      children,
                      content,
                      onChange,
                      onDelete,
                      onMoveUp,
                      onMoveDown,
                      editMode = false,
                    }) => {

  return (
    <div className="flex relative">
      
      {editMode && (
        <BlockEditActions className={"p-1"} onMoveUp={onMoveUp} onMoveDown={onMoveDown}
                          onDelete={onDelete}/>
      )}
      {content &&
        <Image src={content} modal
               display={"block"} className={"rounded-none"}/>}
      {content === "" && (
        <div className="w-full h-72 bg-back flex items-center justify-center">
          <Spinner/>
        </div>
      )}

    </div>
  );
};

export default ImageBlock;

