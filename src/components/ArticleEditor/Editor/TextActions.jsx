import React, { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
const TextActions = ({ editor }) => {
  const [active, setActive] = useState([]);
  function updateActiveButtons() {
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
    document.addEventListener("selectionchange", updateActiveButtons);
  }, []);
  return (
    <div className="flex justify-between bg-secondary pb-2 px-2">
      <div className="flex">
        <Button
          variant={active.includes("bold") ? "primary" : "secondary"}
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("bold");
            updateActiveButtons();
          }}
          className="p-2"
        >
          <FaBold size={"24px"} />
        </Button>
        <Button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("italic");
            updateActiveButtons();
          }}
          variant={active.includes("italic") ? "primary" : "secondary"}
          className="p-2"
        >
          <FaItalic size={"24px"} />
        </Button>
        <Button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("underline");
            updateActiveButtons();
          }}
          variant={active.includes("underline") ? "primary" : "secondary"}
          className="p-2"
        >
          <FaUnderline size={"24px"} />
        </Button>
        <Button
          onMouseDown={(e) => {
            e.preventDefault();
            editor.format("strikethrough");
            updateActiveButtons();
          }}
          variant={active.includes("strikethrough") ? "primary" : "secondary"}
          className="p-2"
        >
          <FaStrikethrough size={"24px"} />
        </Button>
      </div>
      <Button
        variant={editor.editEnabled() ? "primary" : "secondary"}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.toggleEditMode();
        }}
        className="p-2"
      >
        <MdModeEditOutline size={"24px"} />
      </Button>
    </div>
  );
};

export default TextActions;
