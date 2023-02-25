import React from "react";

const Editor = ({ editor, blockHandler, className }) => {
  return (
    <div className={className}>
      {editor?.getBlocks()?.map((block) => blockHandler(block, editor))}
    </div>
  );
};

export default Editor;
