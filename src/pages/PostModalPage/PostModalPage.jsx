import React, {useState} from "react";

import PostService from "../../services/PostService";
import PostPlaceholder from "../../components/UI/Placeholders/PostPlaceholder/PostPlaceholder";
import PostList from "../../components/PostList/PostList";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import MainLayout from "../../components/Layout/MainLayout/MainLayout";
import {useQuery} from "react-query";
import Heading from "../../components/UI/Heading";
import {Navigate, useParams} from "react-router-dom";
import PostModal from "../../features/post/PostModal";
import New from "../New";

const PostModalPage = () => {
  const {id} = useParams();
  const {
    data: post,
    isLoading: postLoading,
    refetch: updatePosts,
    error,
  } = useQuery("fetchPost", () => PostService.getPostByID(id).then(res => res.data));
  const [cancel, setCancel] = useState(false);
  return (
    <>
      {post &&
        <PostModal post={post} onCancel={() => setCancel(true)}/>
      }
      {cancel && <Navigate to={"/"}/>}
      <New/>
    </>
  );
};
export default PostModalPage;
