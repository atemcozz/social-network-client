import React from "react";
import TextArea from "../../components/UI/Input/TextArea";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Tag from "../../components/Post/Tag/Tag";
import {
  MdAddPhotoAlternate,
  MdVideoCall,
  MdClose,
  MdVideocam,
  MdAdd,
} from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
import PostService from "../../services/PostService";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/UI/Toggle/Toggle";
import Spinner from "../../components/UI/Spinner/Spinner";
import MapPicker from "../../components/Map/MapPicker";
import InfoLabel from "../../components/UI/InfoLabel/InfoLabel";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import {
  Editor,
  useEditor,
  blockHandler,
  BlockActions,
  TextActions,
} from "../../components/ArticleEditor";
import CloudinaryService from "../../services/CloudinaryService";
import Modal from "../../components/UI/Modal/Modal";

const CreatePost = () => {
  const photoInput = useRef();
  const videoInput = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [lastMediaID, setLastMediaID] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [lastTagID, setLastTagID] = useState(0);
  const [error, setError] = useState();
  const [location, setLocation] = useState();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const editor = useEditor();
  const [preview, setPreview] = useState();

  function sendPost() {
    const data = {
      title: title,
      preview: preview,
      content: JSON.stringify(editor?.getBlocks()),
      tags: tags.map((t) => t.value),
    };
    console.log(data);
    setLoading(true);
    PostService.createPost(data)
      .then((res) => navigate(`/post/${res.data?.post_id}`))
      .catch((e) => setError(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }

  function addTag() {
    setTagInput("");
    if (tagInput.trim().length > 30) {
      setError("Максимальная длина тега - 30 символов");
      return;
    }
    if (tags.length > 10) {
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

  function handlePreview(event) {
    event.preventDefault();
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      setImageLoading(true);
      CloudinaryService.uploadImage(file)
        .then((res) => setPreview(res?.data?.secure_url))
        .catch(setError)
        .finally(() => setImageLoading(false));
    };
  }
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="px-4">
        <div className="font-bold text-xl mb-4">Новое место</div>

        <div
          className="relative h-32 rounded-t-lg overflow-hidden bg-back cursor-pointer"
          onClick={handlePreview}
        >
          {imageLoading && (
            <div className="h-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {preview && !imageLoading && (
            <div className="flex justify-center items-center">
              <img
                src={preview}
                alt="preview"
                className="w-full object-cover object-top h-32 blur-sm"
              />

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back to-transparent"></div>
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 absolute rounded-lg shadow-xl object-cover"
              />
            </div>
          )}
          {!preview && !imageLoading && (
            <div className="h-full flex items-center justify-center">
              <Button variant="outlined">
                <MdAddPhotoAlternate size="64px" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col rounded-b-lg shadow-md p-4 bg-back gap-3">
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Input
            value={title}
            className="font-bold placeholder:font-normal "
            placeholder={"Название"}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="relative">
            <div className="rounded-t-lg h-2 bg-secondary"></div>
            <div className="sticky top-16">
              <TextActions editor={editor} />
            </div>

            <Editor editor={editor} blockHandler={blockHandler} />
            <BlockActions editor={editor} onBlockLoad={setImageLoading} />
            <a
              className="cursor-pointer"
              onClick={() => alert(JSON.stringify(editor.getBlocks(), 0, 2))}
            >
              [show raw]
            </a>
          </div>
          <InfoLabel>
            Используйте блоки для добавления контента в статью
          </InfoLabel>
          {/* <div className="flex gap-2 items-center flex-wrap">
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
                return null;
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
          )} */}
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
          {title?.length > 0 && preview ? (
            <Button variant="primary" onClick={sendPost}>
              Отправить
            </Button>
          ) : (
            <Button variant="disabled">Отправить</Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
