import React, {memo, useState} from 'react';
import Button from "../../../ui/Button/Button";
import {MdDelete, MdAddPhotoAlternate, MdOutlinePostAdd} from "react-icons/md";
import {FaArrowUp, FaArrowDown, FaChevronLeft, FaPlus, FaMapMarkedAlt} from "react-icons/fa";
import classNames from "classnames";

import {} from "react-icons/fa";

const BlockEditActions = ({onMoveUp, onMoveDown, onDelete, className}) => {


  return (

    <div
      className={classNames("flex flex-col gap-1 bg-back-darkest", className)}>
      <Button
        variant={"secondary"}
        className={"shadow"}
        onClick={onMoveUp}>
        <FaArrowUp size={"20px"}/>
      </Button>
      <Button
        variant={"secondary"}
        className={"shadow"}
        onClick={onMoveDown}>
        <FaArrowDown size={"20px"}/>
      </Button>
      <Button
        variant={"danger"}
        className={"shadow"}
        onClick={onDelete}>
        <MdDelete size={"20px"}/>
      </Button>


    </div>

  );
};

export default memo(BlockEditActions);