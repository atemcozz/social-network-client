import React, {useState} from 'react';
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import {MdAdd} from "react-icons/md";
import Tag from "../../ui/Tag/Tag";

const TagsCreateContainer = ({tags, onAdd, onRemove}) => {
  const [tagInput, setTagInput] = useState("");

  function handleAdd() {
    const success = onAdd(tagInput);
    if (success) setTagInput("");
  }

  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder={"Введите тег..."}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />

        <Button onClick={handleAdd}>
          <MdAdd size="24px"/>
        </Button>
      </div>
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3">
          {tags.map((tag, index) => (
            <Tag key={index} value={tag.value} id={tag.id} deletable onDelete={onRemove}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsCreateContainer;