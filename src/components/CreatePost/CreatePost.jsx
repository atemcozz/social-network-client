import React from "react";
import TextArea from "../UI/Input/TextArea";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Tag from "../Post/Tag/Tag";
import {
  MdAddPhotoAlternate,
  MdVideoCall,
  MdOutlineAudiotrack,
  MdClose,
  MdVideocam,
  MdAdd,
} from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
import PostService from "../../services/PostService";
import { useNavigate } from "react-router-dom";
import Toggle from "../UI/Toggle/Toggle";
import Spinner from "../UI/Spinner/Spinner";
import MapPicker from "../Map/MapPicker";
import InfoLabel from "../UI/InfoLabel/InfoLabel";
const CreatePost = () => {
  const photoInput = useRef();
  const videoInput = useRef();
  const audioInput = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [lastMediaID, setLastMediaID] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [lastTagID, setLastTagID] = useState(0);
  const [error, setError] = useState();
  const [nsfw, setNsfw] = useState(false);
  const [location, setLocation] = useState();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function addMedia(type, event) {
    const files = event.target.files;
    if (files && files[0]) {
      let attachments = [];
      [...files].forEach((file, index) => {
        attachments.push({
          id: lastMediaID + index,
          type,
          file,
          url: URL.createObjectURL(file),
        });
      });

      setLastMediaID((state) => state + files.length);
      setAttachments((state) => [...state, ...attachments]);
      console.log(attachments);
    }
  }
  function removeMedia(id) {
    setAttachments((state) => state.filter((at) => at.id !== id));
  }
  function sendPost() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (location && locationEnabled) {
      formData.append("lat", location.lat);
      formData.append("lng", location.lng);
    }

    attachments.forEach((at, index) => formData.append(`files[]`, at.file));
    tags.forEach((tag) => formData.append("tags[]", tag.value));
    setLoading(true);
    PostService.createPost(formData)
      .then((res) => navigate(`/post/${res.data?.post_id}`))
      .catch((e) =>
        setError(e.response.data?.msg ? e.response.data.msg : e.message)
      )
      .finally(() => setLoading(false));
  }
  function addTag() {
    setTagInput("");
    if (tagInput.trim().length > 30) {
      setError("Максимальная длина тега - 30 символов");
      return;
    }
    if (tags.length >= 10) {
      setError("Максимальное число тегов - 10");
      return;
    }
    if (
      tagInput.trim().length > 0 &&
      tags.filter((tag) => tag.value.toLowerCase() === tagInput.toLowerCase())
        .length === 0
    ) {
      const tag = {
        id: lastTagID,
        value: tagInput[0].toUpperCase() + tagInput.slice(1),
      };
      setTags((state) => [...state, tag]);
      setLastTagID((state) => state + 1);
    }
  }
  function removeTag(id) {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  }
  function processLocationInput(e) {
    const coords = e.target.value.split(",").map((el) => el.trim());
    const lat = Math.min(Math.max(coords[0], -90), 90);
    const lng = Math.min(Math.max(coords[1], -180), 180);
    setLocation({ lat: lat ? lat : 0, lng: lng ? lng : 0 });
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <div className="font-bold text-xl pl-6 pb-4">Новое место</div>

      <div className="flex flex-col rounded-lg shadow-md p-4 bg-back gap-3">
        <Input
          value={title}
          className="font-bold placeholder:font-normal "
          placeholder={"Название"}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* <div className="font-bold text-lg">Медиа</div> */}
        <div className="flex gap-2 items-center flex-wrap">
          <Button
            variant="outlined"
            className={"flex-1"}
            onClick={() => photoInput.current.click()}
          >
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
          <Button
            variant="outlined"
            className={"flex-1"}
            onClick={() => videoInput.current.click()}
          >
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
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {attachments &&
            attachments.map((at, index) => {
              if (at.type === "photo")
                return (
                  <div key={index} className="relative">
                    <Button
                      className={"absolute p-1 z-10 right-0"}
                      onClick={() => removeMedia(at.id)}
                    >
                      <MdClose className="text-white" />
                    </Button>
                    <img
                      src={at.url}
                      alt="img"
                      className="w-40 h-40 object-cover rounded-lg shadow"
                    />
                  </div>
                );
              if (at.type === "video")
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
                      src={at.url}
                      alt="video"
                      className="w-40 h-40 object-cover rounded-lg shadow"
                    />
                  </div>
                );
            })}
        </div>
        <TextArea
          value={description}
          rows={3}
          placeholder={"Описание"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <Toggle
            active={locationEnabled}
            onChange={() => setLocationEnabled((state) => !state)}
          />
          <div>Местоположение</div>
        </div>
        {locationEnabled && (
          <>
            <InfoLabel>Нажмите на карту, чтобы выбрать место</InfoLabel>
            <MapPicker
              position={location}
              onPositionSet={setLocation}
              zoom={1}
            />

            {location && (
              <Input
                value={`${location?.lat}, ${location?.lng}`}
                placeholder={"Позиция"}
                onChange={processLocationInput}
              />
            )}
          </>
        )}
        <div>
          <div className="font-bold text-lg pb-3">Теги</div>
          <div className="flex gap-2">
            <Input
              placeholder={"Введите тег..."}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />

            <Button onClick={addTag}>
              <MdAdd size="24px" />
            </Button>
          </div>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-3">
              {tags.map((tag, index) => (
                <Tag key={index} id={tag.id} deletable onDelete={removeTag}>
                  {tag.value}
                </Tag>
              ))}
            </div>
          )}
        </div>
        {error && (
          <div className="text-white bg-danger rounded-lg p-4 break-words">
            {error}
          </div>
        )}
        {attachments.length > 0 &&
        title?.length > 0 &&
        !(locationEnabled && !location) ? (
          <Button variant="primary" onClick={sendPost}>
            Отправить
          </Button>
        ) : (
          <Button variant="disabled">Отправить</Button>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
