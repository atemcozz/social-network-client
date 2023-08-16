import React from "react";
import InfoLabel from "../../../../ui/InfoLabel/InfoLabel";
import BlockEditActions from "../BlockEditActions";
import {MapRoutePicker} from "../../../Map";

export const GeoRouteBlock = ({
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

