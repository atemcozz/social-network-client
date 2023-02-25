import ContentEditable from "react-contenteditable";
import Button from "../../../UI/Button/Button";
import { MdDelete } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import sanitize from "sanitize-html";
import sanitazeSettings from "../consts/sanitazeSettings";
const TextBlock = ({
  children,
  content,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  edit = false,
}) => {
  return (
    <div className="flex">
      {edit && (
        <div className="flex flex-col gap-2 p-2 bg-secondary">
          <Button onClick={onDelete} variant="danger">
            <MdDelete size="24px" />
          </Button>
          <Button onClick={onMoveUp}>
            <FaArrowUp size="24px" />
          </Button>
          <Button onClick={onMoveDown}>
            <FaArrowDown size="24px" />
          </Button>
        </div>
      )}

      <ContentEditable
        html={sanitize(content, sanitazeSettings)}
        className={
          "flex-1 p-2 overflow-x-hidden break-words outline-none bg-back-darker"
        }
        placeholder={"Введите текст..."}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default TextBlock;
