import React, {useEffect} from 'react';
import EditorContent from "./EditorContent";
import useEditor from "../hooks/useEditor";
import {Text} from "../lib/Blocks/Text";
import {Image} from "../lib/Blocks/Image";
import {Geo} from "../lib/Blocks/Geo";
import EditorTopBar from "./EditorTopBar";
import BlockActions from "./BlockActions";
import Button from "../../../ui/Button/Button";

export const RichTextEditor = ({editor}) => {

  useEffect(() => {
    if (editor) {
      editor.insertBlock("text", "Sample text");
    }

  }, [editor]);
  if (!editor) return null;
  return (
    <div>
      <EditorTopBar editor={editor}/>
      <EditorContent editor={editor}/>
      <BlockActions editor={editor}/>
      <Button variant={"secondary"} className={"mt-1"}
              onClick={() => alert(JSON.stringify(editor.json(), null, 2))}>show
        raw</Button>
    </div>
  );
};