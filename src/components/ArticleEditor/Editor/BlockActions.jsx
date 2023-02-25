import React from "react";
import Button from "../../UI/Button/Button";
import CloudinaryService from "../../../services/CloudinaryService";
import {
  MdAddPhotoAlternate,
  MdOutlinePostAdd,
  MdVideoCall,
} from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
const BlockActions = ({ editor, onBlockLoad }) => {
  function handleImage(event) {
    event.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      //const url = URL.createObjectURL(file);
      //onBlockLoad(true);
      const block = editor.insertBlock("image", "");
      CloudinaryService.uploadImage(file)
        .then((res) => editor.setBlockContent(block, res?.data?.secure_url))
        .catch(console.log);
    };
  }
  function handleGeo(event) {
    event.preventDefault();
    editor.insertBlock("geo", null);
  }
  return (
    <div className="flex flex-wrap justify-between">
      <Button
        onClick={() => editor.insertBlock("text")}
        variant="secondary"
        className={"flex-1 justify-center rounded-none rounded-bl-xl"}
      >
        <MdOutlinePostAdd size={"32px"} />
      </Button>
      <Button
        onMouseDown={handleImage}
        variant="secondary"
        className={"flex-1 justify-center rounded-none"}
      >
        <MdAddPhotoAlternate size={"32px"} />
      </Button>

      <Button
        onMouseDown={handleGeo}
        variant="primary"
        className={"flex-1 justify-center rounded-none rounded-br-xl"}
      >
        <FaMapMarkedAlt size={"32px"} />
      </Button>
    </div>
  );
};

export default BlockActions;
