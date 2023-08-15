import React from "react";
import Button from "../../../ui/Button/Button";
import {MdAddPhotoAlternate, MdOutlinePostAdd} from "react-icons/md";
import {FaMapMarkedAlt, FaRoute} from "react-icons/fa";

const BlockActions = ({editor}) => {
  if (!editor) return null;

  function handleImage(event) {
    event.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      editor.insertBlock("image", {file});
    };

  }

  function getLastBlockType() {
    const block = editor.getBlocks()[editor.getBlocks().length - 1];
    if (!block) return;
    return block.type;
  }

  return (
    <div>
      <div className={"p-1 bg-back-darkest rounded-b-lg flex gap-1 overflow-x-auto flex-wrap"}>

        <Button
          variant={getLastBlockType() === "text" ? "disabled" : "secondary"}
          disabled={getLastBlockType() === "text"}
          onClick={() => {

            editor.insertBlock("text");
          }}

        >

          <MdOutlinePostAdd size={"24px"}/>
          Текст
        </Button>


        <Button variant={"secondary"} onClick={

          handleImage

        }>
          <MdAddPhotoAlternate size={"24px"}/>
          Фото
        </Button>
        <Button variant={"primary"} onClick={() => editor.insertBlock("geo")}>
          <FaMapMarkedAlt size={"24px"}/>
          Место
        </Button>
        <Button variant={"primary"} onClick={() => editor.insertBlock("geo_route")}>
          <FaRoute size={"24px"}/>
          Маршрут
        </Button>
      </div>
    </div>
  );
};

export default BlockActions;
