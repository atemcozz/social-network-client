import React from "react";
import { useState } from "react";
import imageNotFound from "../../../assets/image_notfound.png";
import Spinner from "../Spinner/Spinner";
const Image = ({ ...props }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="w-full rounded-lg bg-secondary h-72 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <img
        className={`w-full rounded-lg ${loading ? "hidden" : "inline"}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = imageNotFound;
        }}
        alt="img"
        onLoad={() => setLoading(false)}
        {...props}
      />
    </>
  );
};

export default Image;
