import React, {useState} from 'react';
import Tabs from "../UI/Tabs/Tabs";
import {MdGridOn, MdMenu} from "react-icons/md";
import Gallery from "../Gallery/Gallery";
import {Link} from "react-router-dom";
import PostList from "../PostList/PostList";
import PostModal from "../../features/post/PostModal";


const ProfileGallery = ({posts}) => {
  const [viewMode, setViewMode] = useState("grid");
  const [modal, setModal] = useState();

  function handleItemClick(post) {
    setModal(post);
  }

  if (!posts || !posts.length) {
    return <div className="text-xl font-bold flex justify-center">
      Постов нет
    </div>;
  }

  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      {modal &&
        <PostModal post={modal} onCancel={() => setModal(null)}/>
      }
      <Tabs>
        <Tabs.Item
          active={viewMode === "grid"}
          onClick={() => setViewMode("grid")}
        >
          <MdGridOn size={"24px"}/>
        </Tabs.Item>
        <Tabs.Item
          active={viewMode === "list"}
          onClick={() => setViewMode("list")}
        >
          <MdMenu size={"24px"}/>
        </Tabs.Item>
      </Tabs>
      {viewMode === "grid" && (
        <Gallery>
          {posts.map(
            (post, index) =>
              <Gallery.Item key={index} post={post} onClick={() => handleItemClick(post)}/>,
          )}
        </Gallery>
      )}
      {viewMode === "list" && <PostList posts={posts}/>}
    </div>
  );
};

export default ProfileGallery;