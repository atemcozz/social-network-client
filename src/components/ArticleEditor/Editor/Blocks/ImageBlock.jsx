import React from "react";
import Button from "../../../UI/Button/Button";
import { MdDelete } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import BoxPlaceholder from "../../../UI/Placeholders/BoxPlaceholder/BoxPlaceholder";
import Spinner from "../../../UI/Spinner/Spinner";
const ImageBlock = ({
  children,
  content,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  edit = false,
}) => {
  return (
    <div className="flex">
      {edit && (
        <div className="flex flex-col gap-2 p-2 bg-secondary">
          <Button onClick={onDelete} variant="danger">
            <MdDelete size="24px" />
          </Button>
          <Button onClick={onMoveUp}>
            <FaArrowUp size="24px" />
          </Button>
          <Button onClick={onMoveDown}>
            <FaArrowDown size="24px" />
          </Button>
        </div>
      )}
      {content && <img src={content} alt="img" className="w-full block" />}
      {content === "" && (
        <div className="w-full h-72 bg-back flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
