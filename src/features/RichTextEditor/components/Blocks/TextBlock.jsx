import ContentEditable from "react-contenteditable";
import Button from "../../../../ui/Button/Button";
import {MdDelete} from "react-icons/md";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import sanitize from "sanitize-html";
import sanitizeSettings from "../../consts/sanitizeSettings";
import {useEffect, useRef, useState} from "react";
import BlockEditActions from "../BlockEditActions";
import {useForceUpdate} from "../../hooks/useForceUpdate";
import useOutsideClick from "../../../../hooks/useOutsideClick";

export const TextBlock = ({
                            children,
                            content,

                            onChange,
                            onDelete,
                            onMoveUp,
                            onMoveDown,
                            editMode = false,
                          }) => {

  const [pasted, setPasted] = useState(0);

  useEffect(() => {
    onChange(sanitize(content, sanitizeSettings));
  }, [pasted]);


  return (
    <div
      className={"flex"}

    >
      {editMode && (
        <BlockEditActions className={"p-1"} onMoveUp={onMoveUp} onMoveDown={onMoveDown}
                          onDelete={onDelete}/>
      )}
      <ContentEditable
        html={content}
        className={
          "flex-1 p-2 overflow-x-hidden break-words outline-none bg-back-darker min-h-[96px]"
        }
        placeholder={"Введите текст..."}
        onChange={(e) =>
          onChange(e.target.value)

        }
        onPaste={(e) => setPasted(p => p + 1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && document.execCommand('formatBlock', false, 'p'))
            document.execCommand('formatBlock', false, 'p');
        }}
      />


    </div>
  );
};

export default TextBlock;
