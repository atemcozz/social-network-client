import React, {memo, useEffect, useState} from 'react';
import EditorTopBarWrapper from "./EditorTopBarWrapper";
import Button from "../../../ui/Button/Button";
import {FaBold, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {MdModeEditOutline} from "react-icons/md";

const EditorTopBar = ({editor}) => {
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
    if (editor) {
      document.addEventListener("selectionchange", updateActiveButtons);
    }

  }, [editor]);
  if (!editor) return null;
  return (
    <EditorTopBarWrapper>
      <Button
        variant={active.includes("bold") ? "primary" : "secondary"}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.format("bold");
          updateActiveButtons();
        }}
        className="p-2"
      >
        <FaBold size={"24px"}/>
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
        <FaItalic size={"24px"}/>
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
        <FaUnderline size={"24px"}/>
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
        <FaStrikethrough size={"24px"}/>
      </Button>
      <Button variant={editor.editModeEnabled() ? "primary" : "outlined"}
              onClick={() => editor.toggleEditMode()}>
        <MdModeEditOutline size={"24px"}/>
      </Button>
    </EditorTopBarWrapper>
  );
};

export default EditorTopBar;