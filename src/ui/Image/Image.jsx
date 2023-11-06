import classNames from "classnames";
import React, {useState} from "react";
import {MdImageNotSupported} from "react-icons/md";
import BoxPlaceholder from "../Placeholders/BoxPlaceholder/BoxPlaceholder";
import Modal from "../Modal/Modal";

const Image = ({className, modal = false, display = "inline", src, alt = "img", ...props}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  if (error) {
    return <div className="rounded-lg bg-secondary h-72 flex justify-center items-center">
      <MdImageNotSupported size={"48px"}/>
    </div>;
  }
  return (
    <>
      {modalActive &&
        <Modal onBgClick={() => setModalActive(false)}>
          <img
            className="max-w-[90vw] max-h-[90vh] md:max-w-[90vw] md:max-h-[90vh] rounded-lg"
            alt="img"
            src={src}
          />
        </Modal>}
      {loading && <BoxPlaceholder className={"h-72"}/>}
      <img
        className={classNames(
          loading ? "hidden" : display,
          "w-full rounded-lg",
          modal ? "cursor-pointer" : "cursor-auto", className,
        )}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        alt={alt}
        onLoad={() => setLoading(false)}
        src={src}
        onClick={() => {
          modal && setModalActive(true);
        }}
        {...props}

      />
    </>
  );
};

export default Image;
