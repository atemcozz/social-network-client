import React from "react";
import { MdClose } from "react-icons/md";
const Tag = ({ children, deletable, id, onClick, onDelete }) => {
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-secondary hover:bg-secondary-darker 
    px-2 py-1  text-sm text-text-secondary ease-in duration-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="max-w-xs truncate">{children}</div>

      {deletable && (
        <button
          className="rounded-full hover:text-text-base"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <MdClose size={"20px"} />
        </button>
      )}
    </div>
  );
};

export default Tag;
