import React from "react";
import TextArea from "../../components/UI/TextArea/TextArea";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Tag from "../../components/UI/Tag/Tag";
import {
  MdAddPhotoAlternate,
  MdVideoCall,
  MdClose,
  MdVideocam,
  MdAdd,
} from "react-icons/md";
import {useRef} from "react";
import {useState} from "react";
import PostService from "../../services/PostService";
import {useNavigate} from "react-router-dom";
import Toggle from "../../components/UI/Toggle/Toggle";
import Spinner from "../../components/UI/Spinner/Spinner";
import MapPicker from "../../components/Map/MapPicker/MapPicker";
import InfoLabel from "../../components/UI/InfoLabel/InfoLabel";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import CloudinaryService from "../../services/CloudinaryService";
import Modal from "../../components/UI/Modal/Modal";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import useEditor from "../../components/RichTextEditor/hooks/useEditor";
import {Text} from "../../components/RichTextEditor/Blocks/Text";
import {Image} from "../../components/RichTextEditor/Blocks/Image";
import {Geo} from "../../components/RichTextEditor/Blocks/Geo";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [lastTagID, setLastTagID] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const editor = useEditor({
    useBlocks: [Text, Image, Geo],
  });

  function sendPost() {
    const data = {
      title: title,
      preview: preview,
      content: JSON.stringify(editor?.json()),
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
          <Spinner/>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="px-4">
        <div className="font-bold text-xl mb-4">Новая запись</div>

        <div
          className="relative h-32 rounded-t-lg overflow-hidden bg-back cursor-pointer"
          onClick={handlePreview}
        >
          {imageLoading && (
            <div className="h-full flex justify-center items-center">
              <Spinner/>
            </div>
          )}
          {preview && !imageLoading && (
            <div className="flex justify-center items-center">
              <img
                src={preview}
                alt="preview"
                className="w-full object-cover object-top h-32 blur-sm"
              />

              <div
                className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-back to-transparent"></div>
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
                <MdAddPhotoAlternate size="64px"/>
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

          <RichTextEditor editor={editor}/>
          <InfoLabel>
            Используйте блоки для добавления контента в статью
          </InfoLabel>
          <div>
            <div className="font-bold text-lg pb-3">Теги</div>
            <div className="flex gap-2">
              <Input
                placeholder={"Введите тег..."}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />

              <Button onClick={addTag}>
                <MdAdd size="24px"/>
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
