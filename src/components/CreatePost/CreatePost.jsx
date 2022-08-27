import React from "react";
import TextArea from "../UI/Input/TextArea";
import Button from "../UI/Button/Button";

import {
  MdAddPhotoAlternate,
  MdVideoCall,
  MdOutlineAudiotrack,
  MdClose,
  MdVideocam,
} from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
let lastMediaID = 0;
const CreatePost = () => {
  const photoInput = useRef();
  const videoInput = useRef();
  const audioInput = useRef();
  const [attachments, setAttachments] = useState([]);

  function addMedia(type, event) {
    if (event.target.files && event.target.files[0]) {
      let files = [];
      for (const file of event.target.files) {
        files.push({
          id: lastMediaID,
          type,
          file: URL.createObjectURL(file),
          filename: file.name,
        });
        lastMediaID++;
      }
      setAttachments((state) => [...state, ...files]);
      console.log(attachments);
    }
  }
  function removeMedia(id) {
    setAttachments((state) => state.filter((at) => at.id !== id));
  }
  return (
    <div>
      <div className="font-bold text-xl pl-6 pb-4">Новый пост</div>
      <div className="flex flex-col rounded-lg shadow-md p-4 bg-back gap-3">
        <div className="font-bold text-lg">Описание поста</div>
        <TextArea rows={3} placeholder={"Введите описание поста..."} />
        <div className="font-bold text-lg">Медиа</div>
        <div className="flex gap-2 items-center flex-wrap md:justify-start justify-center">
          <Button variant="outlined" onClick={() => photoInput.current.click()}>
            <MdAddPhotoAlternate size="32px" />
            Фото
            <input
              type="file"
              multiple
              ref={photoInput}
              accept="image/*"
              onChange={(e) => addMedia("photo", e)}
              className="hidden"
            />
          </Button>
          <Button variant="outlined" onClick={() => videoInput.current.click()}>
            <MdVideoCall size="32px" />
            Видео
            <input
              type="file"
              multiple
              ref={videoInput}
              accept="video/*"
              onChange={(e) => addMedia("video", e)}
              className="hidden"
            />
          </Button>
          <Button variant="outlined" onClick={() => audioInput.current.click()}>
            <MdOutlineAudiotrack size="32px" />
            Аудио
            <input
              type="file"
              multiple
              ref={audioInput}
              accept="audio/*"
              onChange={(e) => addMedia("audio", e)}
              className="hidden"
            />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {attachments &&
            attachments.map((at, index) => {
              switch (at.type) {
                case "photo":
                  return (
                    <div key={index} className="relative">
                      <Button
                        className={"absolute p-1 z-10 right-0"}
                        onClick={() => removeMedia(at.id)}
                      >
                        <MdClose className="text-white" />
                      </Button>
                      <img
                        src={at.file}
                        alt="img"
                        className="w-40 h-40 object-cover rounded-lg shadow"
                      />
                    </div>
                  );
                case "video":
                  return (
                    <div key={index} className="relative">
                      <Button
                        className={"absolute p-1 z-20 right-0"}
                        onClick={() => removeMedia(at.id)}
                      >
                        <MdClose className="text-white" />
                      </Button>
                      <div className="absolute inset-0 z-10 flex justify-center items-center">
                        <MdVideocam size={"64px"} className="text-white" />
                      </div>

                      <video
                        src={at.file}
                        alt="video"
                        className="w-40 h-40 object-cover rounded-lg shadow"
                      />
                    </div>
                  );
                case "audio":
                  return (
                    <div
                      key={index}
                      className="relative w-40 h-40 rounded-lg shadow bg-primary-darker"
                    >
                      <Button
                        className={"absolute p-1 z-10 right-0"}
                        onClick={() => removeMedia(at.id)}
                      >
                        <MdClose className="text-white" />
                      </Button>
                      <div className="flex flex-col justify-center items-center h-full text-white text-center">
                        <MdOutlineAudiotrack size={"64px"} />
                        <div className="w-36 truncate">{at.filename}</div>
                      </div>
                    </div>
                  );
                default:
                  break;
              }
            })}
        </div>
        <Button variant="primary">Отправить</Button>
      </div>
    </div>
  );
};

export default CreatePost;
