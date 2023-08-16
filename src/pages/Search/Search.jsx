import React, {useEffect, useState} from "react";

import {PostList, PostService} from "../../features/Post";
import Button from "../../ui/Button/Button";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import PostPlaceholder from "../../ui/Placeholders/PostPlaceholder/PostPlaceholder";
import {useQuery} from "react-query";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import Heading from "../../ui/Heading";
import TagsCreateContainer from "../../components/TagsCreateContainer/TagsCreateContainer";
import {useSearchParams} from "react-router-dom";
import Paginator from "../../components/Paginator/Paginator";
import store from "../../store";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [searchType, setSearchType] = useState("posts");
  const [lastTagID, setLastTagID] = useState(0);
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("new");
  const page = Number(params.get("page") || 1);
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: updatePosts,
    error,
  } = useQuery(["searchPosts", tags, sort, page], () =>
    PostService.getPosts({
      tags: tags.map((tag) => tag.value),
      sort,
      page,
      t: store.sessionTimestamp,
    }).then((res) => res.data),
  );

  function sortBy(value) {
    setSort(value);
    params.delete("page");
    params.set("sort", value);
    setParams(params);
  }

  function addTag(tag) {
    if (
      tag.trim().length &&
      !tags.filter((t) => tag.toLowerCase() === t.value.toLowerCase())
        .length
    ) {
      const newTag = {
        id: lastTagID,
        value: tag.toLowerCase(),
      };
      params.delete("page");
      params.append("tags[]", newTag.value);
      setParams(params);
      setTags((state) => [...state, newTag]);
      setLastTagID((state) => state + 1);
      return true;
    }
    return false;
  }

  function removeTag(id, name) {
    const newTags = tags.filter((tag) => tag.id !== id);
    params.delete("page");
    const newParams = [...params.entries()].filter(([key, value]) => !(key === "tags[]" && value === name));
    setTags(newTags);
    setParams(newParams);
  }

  function paginate(page) {
    params.set("page", page);
    setParams(params);
  }

  useEffect(() => {
    setSort(params.get("sort") || "new");
    setTags(params.getAll("tags[]")
      .map((tag, index) => ({id: index, value: tag})));
  }, []);
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Heading>Поиск</Heading>

        <div className="rounded-lg shadow-md p-4 bg-back mb-4 mt-4">
          <div className="flex gap-2 mb-3">
            <Button
              onClick={() => setSearchType("posts")}
              variant={searchType === "posts" ? "primary" : "secondary"}
            >
              Посты
            </Button>
            <Button variant={"disabled"}>Пользователи</Button>
          </div>
          <div className="mb-3">
            <div className="font-bold text-lg mb-3">Теги</div>
            <TagsCreateContainer tags={tags} onAdd={addTag} onRemove={removeTag}/>

          </div>
          <div className="font-bold text-lg mb-3">Сортировка</div>
          <div className="flex" role={"group"}>
            <Button
              variant={sort === "new" ? "primary" : "outlined"}
              className={"rounded-r-none flex-1 justify-center"}
              onClick={() => sortBy("new")}
            >
              Новое
            </Button>
            <Button
              variant={sort === "popular" ? "primary" : "outlined"}
              className={"rounded-l-none flex-1 justify-center"}
              onClick={() => sortBy("popular")}
            >
              Популярное
            </Button>
          </div>
        </div>
        {postsLoading && <PostPlaceholder/>}
        <PostList posts={posts?.contents} onChange={updatePosts}/>
        {error?.message && <ErrorMessage>{error?.message} </ErrorMessage>}
        <Paginator pagesCount={posts?.pages_count} currentPage={page} onPageChange={paginate}/>
      </div>
    </MainLayout>
  );
};
export default Search;
