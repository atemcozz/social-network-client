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
import CreatePostPreviewLoader from "../../components/CreatePostPreviewLoader/CreatePostPreviewLoader";
import TagsCreateContainer from "../../components/TagsCreateContainer/TagsCreateContainer";
import {GeoRoute} from "../../components/RichTextEditor/Blocks/GeoRoute";
import {API_KEY} from "../../components/Map/Yandex/consts";
import {YMaps} from "@pbe/react-yandex-maps";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [lastTagID, setLastTagID] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const editor = useEditor({
    useBlocks: [Text, Image, Geo, GeoRoute],
  });

  function sendPost() {
    const data = {
      title: title,
      preview: preview,
      content: editor?.json(),
      tags: tags.map((t) => t.value),
    };
    setLoading(true);
    PostService.createPost(data)
      .then((res) => navigate(`/post/${res.data?.id}`))
      .catch((e) => setError(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  }

  function addTag(tag) {
    if (tag.trim().length > 30) {
      setError("Максимальная длина тега - 30 символов");
      return false;
    }
    if (tags.length > 10) {
      setError("Максимальное число тегов - 10");
      return false;
    }
    if (
      tag.trim().length > 0 &&
      tags.filter((t) => tag.toLowerCase() === t.value.toLowerCase())
        .length === 0
    ) {
      const newTag = {
        id: lastTagID,
        value: tag.toLowerCase(),
      };
      setTags((state) => [...state, newTag]);
      setLastTagID((state) => state + 1);
      return true;
    }
    return false;
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
      <div className="font-bold text-xl mb-4">Новая запись</div>
      <CreatePostPreviewLoader src={preview} onClick={handlePreview} loading={imageLoading}/>

      <div className="flex flex-col rounded-b-lg shadow-md p-4 bg-back gap-3">
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          value={title}
          className="font-bold placeholder:font-normal "
          placeholder={"Название"}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <YMaps
          query={{
            load: "package.full",
            apikey: API_KEY,
          }}
        >
          <RichTextEditor editor={editor}/>
        </YMaps>
        <InfoLabel>
          Используйте блоки для добавления контента в статью
        </InfoLabel>
        <div>
          <div className="font-bold text-lg pb-3">Теги</div>
          <TagsCreateContainer tags={tags} onAdd={addTag} onRemove={removeTag}/>
        </div>
        {title?.length > 0 && preview ? (
          <Button variant="primary" onClick={sendPost}>
            Отправить
          </Button>
        ) : (
          <Button variant="disabled">Отправить</Button>
        )}
      </div>
    </MainLayout>
  );
};

export default CreatePost;
