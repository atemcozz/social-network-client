import React from "react";
import Post from "../Post/Post";
import NavActions from "../UI/Sidemenu/NavActions";
const Home = () => {
  return (
    <div className="bg-back-darker mt-16 text-text-base">
      {/* <div className="z-50 fixed inset-0 bg-[rgba(0,0,0,0.75)]">
        <div className="fixed inset-y-0 left-0 bg-back w-4/6 rounded-b-3xl rounded-tr-3xl p-4">
          <NavActions />
        </div>
      </div> */}
      <div className="py-4 md:px-4 flex mx-auto max-w-screen-lg justify-center">
        <aside className="hidden md:block h-min bg-back w-72 p-4 rounded-lg">
          <NavActions />
        </aside>
        <div className="w-full px-4 min-h-screen flex flex-col gap-4">
          <div className="font-bold text-xl pl-6">Популярное</div>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <aside className="hidden md:block h-96 bg-back w-72 p-4 rounded-lg"></aside>
      </div>
    </div>
  );
};
export default Home;
