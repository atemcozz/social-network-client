import React from "react";
import InfoLabel from "../../../UI/InfoLabel/InfoLabel";
import MapPicker from "../../../Map/MapPicker/MapPicker";
import Button from "../../../UI/Button/Button";
import { MdDelete } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const MapBlock = ({
  id,
  children,
  content,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  edit = false,
}) => {
  return (
    <div className="flex">
      {edit && (
        <div className="flex flex-col gap-2 p-2 bg-secondary">
          <Button onClick={onDelete} variant="danger">
            <MdDelete size="24px" />
          </Button>
          <Button onClick={onMoveUp}>
            <FaArrowUp size="24px" />
          </Button>
          <Button onClick={onMoveDown}>
            <FaArrowDown size="24px" />
          </Button>
        </div>
      )}
      <div className="flex-1">
        <InfoLabel className="rounded-none">
          Нажмите на карту, чтобы выбрать место
        </InfoLabel>
        <MapPicker position={content} onPositionSet={onChange} zoom={1} />
      </div>
    </div>
  );
};

export default MapBlock;
