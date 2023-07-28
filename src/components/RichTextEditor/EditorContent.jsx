import React from "react";

const EditorContent = ({editor}) => {
  if (!editor) return null;
  return (
    <div>
      {editor?.getBlocks()?.map((block, index) => block.render(index))}
    </div>
  );
};

export default EditorContent;
