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
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Search = () => {
  const { store } = useContext(Context);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tagInput, setTagInput] = useState("");
  const [lastTagID, setLastTagID] = useState(0);
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("new");
  const [posts, postsLoading, error, updatePosts] = useRequest(() =>
    PostService.getPosts({ tags: tags.map((tag) => tag.value).join(","), sort })
  );

  function addTag() {
    setTagInput("");
    const tag = tagInput[0].toUpperCase() + tagInput.slice(1);
    searchParams.set(
      "tags",
      tags.length > 0 ? [tags.map((tag) => tag.value), tag].join(",") : tag
    );
    setSearchParams(searchParams.toString());
    // if (
    //   tagInput.trim().length > 0 &&
    //   tags.filter((tag) => tag.value.toLowerCase() === tagInput.toLowerCase())
    //     .length === 0
    // ) {
    //   const tag = {
    //     id: lastTagID,
    //     value: tagInput[0].toUpperCase() + tagInput.slice(1),
    //   };

    //   setTags((state) => [...state, tag]);
    //   setLastTagID((state) => state + 1);
    // }
  }
  function removeTag(id) {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
    if (newTags.length > 0) {
      searchParams.set("tags", newTags.map((tag) => tag.value).join(","));
    } else {
      searchParams.delete("tags");
    }
    setSearchParams(searchParams.toString());
  }
  useEffect(() => {
    updatePosts();
  }, [tags, sort]);

  useEffect(() => {
    if (searchParams && searchParams.has("tags")) {
      const queryTags = searchParams.get("tags").split(",");
      setTags(
        queryTags.map((tag, index) => {
          return {
            id: lastTagID + index,
            value: tag,
          };
        })
      );
      setLastTagID((state) => state + queryTags.length);
    }
    // if (searchParams && searchParams.get("tag")) {
    //   setTags([{ value: searchParams.get("tag"), id: 0 }]);
    //   window.history.pushState({}, document.title, window.location.pathname);
    // }
  }, [searchParams]);

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
        <div className="font-bold text-lg mb-3">Сортировка</div>
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
      {postsLoading && (
        <div className="flex items-center justify-center w-full h-[30vh]">
          <Spinner />
        </div>
      )}
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
