import React from "react";
import Post from "../Post/Post";
import ActionSideMenu from "../ActionSideMenu/ActionSideMenu";

const Home = () => {
  const posts = [
    {
      userNickname: "Вася Пупкин",
      userAvatarURL:
        "https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png",
      geo: "Санкт-Петербург",
      photoURL:
        "https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      description: "Description",
      likesCount: 2,
      commentsCount: 12,
      bookmark: false,
    },
    {
      userNickname: "Вася Пупкин",
      userAvatarURL:
        "https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png",
      geo: "Санкт-Петербург",
      photoURL:
        "https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      description: "Description",
      likesCount: 534,
      commentsCount: 232,
      bookmark: true,
      liked: true,
    },
    {
      userNickname: "Вася Пупкин",
      userAvatarURL:
        "https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png",
      geo: "Санкт-Петербург",
      photoURL:
        "https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      description: "Description",
      likesCount: 2,
      commentsCount: 12,
      bookmark: false,
    },
    {
      userNickname: "Вася Пупкин",
      userAvatarURL:
        "https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png",
      geo: "Санкт-Петербург",
      photoURL:
        "https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      description: "Description",
      likesCount: 2,
      commentsCount: 12,
      bookmark: false,
    },
    {
      userNickname: "Вася Пупкин",
      userAvatarURL:
        "https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png",
      geo: "Санкт-Петербург",
      photoURL:
        "https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
      description: "Description",
      likesCount: 2,
      commentsCount: 12,
      bookmark: false,
    },
  ];
  return (
    <div className="bg-back-darker text-text-base">
      {/* <div className="z-50 fixed inset-0 bg-[rgba(0,0,0,0.75)]">
        <div className="fixed inset-y-0 left-0 bg-back w-4/6 rounded-b-3xl rounded-tr-3xl p-4">
          <NavActions />
        </div>
      </div> */}
      <div className="py-4 md:px-4 flex mx-auto max-w-screen-lg justify-center">
        <ActionSideMenu />
        <div className="w-full px-4 min-h-screen flex flex-col gap-4">
          <div className="font-bold text-xl pl-6">Популярное</div>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
        <aside className="hidden md:block sticky top-20 w-96 h-screen">
          <div className="h-96 bg-back p-4 rounded-lg"></div>
        </aside>
      </div>
    </div>
  );
};
export default Home;
