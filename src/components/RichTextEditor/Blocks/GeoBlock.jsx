import React, {useState} from "react";
import InfoLabel from "../../UI/InfoLabel/InfoLabel";
import MapPicker from "../../Map/MapPicker/MapPicker";
import Button from "../../UI/Button/Button";
import {MdDelete} from "react-icons/md";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import BlockEditActions from "./BlockEditActions";

const GeoBlock = ({
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
                    Нажмите на карту, чтобы выбрать место
                </InfoLabel>
                <MapPicker position={content} onPositionSet={onChange} zoom={1}/>
            </div>

        </div>
    );
};

export default GeoBlock;
