import React from "react";

const LinkText = ({ children }) => {
  function linkifyText(text) {
    const regex =
      "https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,}";
    return text.split(/\s+/).map((part, index) => {
      if (part.match(regex)) {
        return (
          <a
            href={part}
            target={"_blank"}
            rel={"noreferrer"}
            className="text-primary"
            key={index}
          >
            {part + " "}
          </a>
        );
      }
      if (part[0] === "@") {
        return (
          <a className="text-primary" key={index}>
            {part + " "}
          </a>
        );
      }
      return part + " ";
    });
  }
  return <>{linkifyText(children)}</>;
};

export default LinkText;
