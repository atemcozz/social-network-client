import React from "react";

const PlaceMarker = ({ onClick, src }) => {
  return (
    <div
      className="absolute bottom-0 -translate-x-1/2 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-16 h-16 p-1 bg-secondary rounded-lg text-text-base
flex items-center justify-center`}
      >
        <img src={src} alt="img" className="w-full h-full rounded" />
      </div>
      <div className="h-0 w-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-secondary mx-auto"></div>
    </div>
  );
};

export default React.memo(PlaceMarker);
