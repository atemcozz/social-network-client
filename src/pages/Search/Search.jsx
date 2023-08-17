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
import Input from "../../ui/Input/Input";
import {useDebounce} from "../../hooks/useDebounce";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [searchType, setSearchType] = useState("posts");
  const [lastTagID, setLastTagID] = useState(0);
  const [tags, setTags] = useState([]);
  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState("");
  const searchDelayed = useDebounce(search, 1000);
  const page = Number(params.get("page") || 1);
  const {
    data: posts,
    isLoading: postsLoading,
    refetch: updatePosts,
    error,
  } = useQuery(["searchPosts", tags, sort, page, searchDelayed], () =>
    PostService.getPosts({
      tags: tags.map((tag) => tag.value),
      sort,
      page,
      search,
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

  function handleSearchBar(e) {
    setSearch(e?.target?.value);
    params.set("search", e?.target?.value);
    setParams(params);
  }

  function paginate(page) {
    params.set("page", page);
    setParams(params);
  }

  useEffect(() => {
    setSort(params.get("sort") || "new");
    setTags(params.getAll("tags[]")
      .map((tag, index) => ({id: index, value: tag})));
    setSearch(params.get("search") || "");
  }, []);
  return (
    <MainLayout>
      <div className="min-h-screen">
        <Heading>Поиск</Heading>

        <div className="rounded-lg shadow-md p-4 bg-back mb-4 mt-4 flex flex-col gap-3">
          {/*<div className="flex gap-2 mb-3">*/}
          {/*  <Button*/}
          {/*    onClick={() => setSearchType("posts")}*/}
          {/*    variant={searchType === "posts" ? "primary" : "secondary"}*/}
          {/*  >*/}
          {/*    Посты*/}
          {/*  </Button>*/}
          {/*  <Button variant={"disabled"}>Пользователи</Button>*/}
          {/*</div>*/}
          <Input placeholder={"Поиск"} value={search} onChange={handleSearchBar}/>
          <div className={"flex flex-col gap-2"}>
            <span className="font-bold text-lg">Теги</span>
            <TagsCreateContainer tags={tags} onAdd={addTag} onRemove={removeTag}/>
          </div>
          <div className={"flex flex-col gap-2"}>
            <span className="font-bold text-lg">Сортировка</span>
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
