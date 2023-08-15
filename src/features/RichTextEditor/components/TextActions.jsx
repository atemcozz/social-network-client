import React, { useEffect, useState } from "react";
const TextActions = ({ editor }) => {
  
  const [active, setActive] = useState([]);

  function updateActivebuttons() {
    const styles = ["bold", "italic", "underline", "strikethrough"];
    let activeStyles = [];
    styles.forEach((style) => {
      if (editor.styleActive(style)) {
        activeStyles.push(style);
      }
    });
    setActive(activeStyles);
  }

  useEffect(() => {
   if(editor) document.addEventListener("selectionchange", updateActivebuttons);
  }, []);
  if(!editor) return null;
  return (
    
    <div style={{marginBottom: "8px"}}>
      <div>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("bold");
            updateActivebuttons();
          }}
          className="p-2"
        >
          bold
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("italic");
            updateActivebuttons();
          }}
    
        >
          italic
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("underline");
            updateActivebuttons();
          }}
        >
          underline
        </button>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("strikethrough");
            updateActivebuttons();
          }}
        >
          strike
        </button>
      </div>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          editor.toggleEditMode();
        }}
      >
        edit blocks
      </button>
    </div>
  );
};

export default TextActions;
