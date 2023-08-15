import React from "react";
import TextArea from "../../ui/TextArea/TextArea";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import Tag from "../../ui/Tag/Tag";
import {
  MdAddPhotoAlternate,
  MdVideoCall,
  MdClose,
  MdVideocam,
  MdAdd,
} from "react-icons/md";
import {useRef} from "react";
import {useState} from "react";
import {PostService} from "../../features/Post";
import {useNavigate} from "react-router-dom";
import Toggle from "../../ui/Toggle/Toggle";
import Spinner from "../../ui/Spinner/Spinner";
import InfoLabel from "../../ui/InfoLabel/InfoLabel";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import CloudinaryService from "../../api/cloudinary/CloudinaryService";
import {RichTextEditor} from "../../features/RichTextEditor";
import useEditor from "../../features/RichTextEditor/hooks/useEditor";
import {Text} from "../../features/RichTextEditor";
import {Image} from "../../features/RichTextEditor";
import {Geo} from "../../features/RichTextEditor";
import {CreatePostPreviewLoader} from "../../features/Post";
import TagsCreateContainer from "../../components/TagsCreateContainer/TagsCreateContainer";
import {GeoRoute} from "../../features/RichTextEditor";
import {API_KEY} from "../../features/Map/consts/consts";
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
