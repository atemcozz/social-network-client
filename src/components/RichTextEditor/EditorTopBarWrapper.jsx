import React, {memo} from "react";

const EditorTopBarWrapper = ({children}) => {
    return (
        <>
            <div className="rounded-t-lg h-2 bg-secondary"></div>
            <div className="flex justify-between bg-secondary px-2 py-1 sticky top-16 z-10">
                <div className="flex gap-1 flex-wrap">
                    {children}
                </div>
            </div>
            <div className="h-1 bg-secondary"></div>

        </>
    )
}
export default memo(EditorTopBarWrapper);