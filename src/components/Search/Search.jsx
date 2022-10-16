import React from "react";
import Post from "../Post/Post";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner/Spinner";
import PostService from "../../services/PostService";
import { useContext } from "react";
import { Context } from "../../index";
import PostList from "../PostList/PostList";
import useQuery from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Tag from "../Post/Tag/Tag";
import { MdAdd } from "react-icons/md";
import Radio from "../UI/Radio/Radio";
const Search = () => {
  const { store } = useContext(Context);
  const query = useQuery();
  const [tagInput, setTagInput] = useState();
  const [lastTagID, setLastTagID] = useState(0);
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("new");
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getPosts({ tags: tags.map((tag) => tag.value).join(","), sort })
  );

  function addTag() {
    setTagInput("");
    if (tagInput.trim().length > 30) {
      // setError("Максимальная длина тега - 30 символов");
      return;
    }
    if (tags.length >= 10) {
      // setError("Максимальное число тегов - 10");
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
  useEffect(() => {
    updatePosts();
  }, [tags, sort]);
  if (postsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[30vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="font-bold text-xl pl-6 pb-4">Поиск</div>
      <div className="rounded-lg shadow-md p-4 bg-back mb-4">
        <div className="mb-3">
          <div className="font-bold text-lg mb-3">Теги</div>

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
        <div className="flex" role={"group"}>
          <Button
            variant={sort === "new" ? "primary" : "outlined"}
            className={"rounded-r-none flex-1 justify-center"}
            onClick={() => setSort("new")}
          >
            Новое
          </Button>
          <Button
            variant={sort === "popular" ? "primary" : "outlined"}
            className={"rounded-l-none flex-1 justify-center"}
            onClick={() => setSort("popular")}
          >
            Популярное
          </Button>
          {/* <Radio>
            <Radio.Item
              checked={sort === "new"}
              name={"sort"}
              onChange={() => setSort("new")}
            >
              Новое
            </Radio.Item>
            <Radio.Item
              checked={sort === "popular"}
              name={"sort"}
              onChange={() => setSort("popular")}
            >
              Популярное
            </Radio.Item>
          </Radio> */}
        </div>
      </div>
      <PostList posts={posts} onChange={updatePosts} />
      {error && (
        <div className="flex flex-col gap-2">
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            В процессе загрузки постов произошла ошибка. Попробуйте
            перезагрузить страницу.
          </div>
          <div className="p-2 bg-danger text-white rounded-lg shadow w-11/12 self-center break-words">
            {error.toString()}
          </div>
        </div>
      )}
    </div>
  );
};
export default Search;
