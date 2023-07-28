import React, {useRef, useState} from "react";
import Button from "../../UI/Button/Button";

import Spinner from "../../UI/Spinner/Spinner";
import Image from "../../UI/Image/Image";
import BlockEditActions from "./BlockEditActions";
import {MdModeEditOutline} from "react-icons/md";
import CloudinaryService from "../../../services/CloudinaryService";
import Modal from "../../UI/Modal/Modal";
import useOutsideClick from "../../../hooks/useOutsideClick";

const ImageBlock = ({
                      children,
                      content,
                      onChange,
                      onDelete,
                      onMoveUp,
                      onMoveDown,
                      editMode = false,
                    }) => {
  const [imageModal, setImageModal] = useState(false);

  return (
    <div className="flex relative">
      {imageModal && (
        <Modal active={imageModal} onBgClick={() => setImageModal(false)}>
          <img
            className="w-[90vw] h-auto md:h-[80vh] md:w-auto rounded-lg"
            alt="img"
            src={content}
          />
        </Modal>
      )}
      {editMode && (
        <BlockEditActions className={"p-1"} onMoveUp={onMoveUp} onMoveDown={onMoveDown}
                          onDelete={onDelete}/>
      )}
      {content &&
        <Image src={content} onClick={() => setImageModal(true)}
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

