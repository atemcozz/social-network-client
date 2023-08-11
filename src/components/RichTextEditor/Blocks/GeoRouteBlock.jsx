import React, {useState} from "react";
import InfoLabel from "../../UI/InfoLabel/InfoLabel";
import Button from "../../UI/Button/Button";
import {MdDelete} from "react-icons/md";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import BlockEditActions from "./BlockEditActions";
import MapPicker from "../../Map/Yandex/MapPicker";
import MapRoutePicker from "../../Map/Yandex/MapRoutePicker";

const GeoRouteBlock = ({
                         children,
                         content,
                         onChange,
                         onDelete,
                         onMoveUp,
                         onMoveDown,
                         editMode = false,
                       }) => {
  return (
    <div className={"flex"}>
      {editMode && (
        <BlockEditActions className={"p-1"} onMoveUp={onMoveUp} onMoveDown={onMoveDown}
                          onDelete={onDelete}/>
      )}
      <div className="flex-1">
        <InfoLabel className="rounded-none">
          Нажмите на карту, чтобы добавить точку к маршруту. Используйте кнопку "сбросить маршрут", если вы хотите
          изменить его.
        </InfoLabel>
        <MapRoutePicker content={content} onChange={onChange}/>
      </div>

    </div>
  );
};

export default GeoRouteBlock;
