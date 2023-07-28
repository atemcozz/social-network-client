import classNames from "classnames";
import React from "react";
import {useState} from "react";
import {MdImageNotSupported} from "react-icons/md";
import BoxPlaceholder from "../Placeholders/BoxPlaceholder/BoxPlaceholder";
import Spinner from "../Spinner/Spinner";

const Image = ({className, display = "inline", ...props}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    return (
        <>
            {loading && <BoxPlaceholder className={"h-72"}/>}
            {error && (
                <div className="rounded-lg bg-secondary h-72 flex justify-center items-center">
                    <MdImageNotSupported size={"48px"}/>
                </div>
            )}

            <img
                className={classNames(
                    loading || error ? "hidden" : display,
                    "w-full rounded-lg", className
                )}
                onError={() => {
                    setError(true);
                    setLoading(false);
                }}
                alt="img"
                onLoad={() => setLoading(false)}
                {...props}
            />
        </>
    );
};

export default Image;
