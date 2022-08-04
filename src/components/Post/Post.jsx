import React from "react";
import Button from "../UI/Button/Button";
import CheckButton from "../UI/Button/CheckButton";
import { BsChatLeftTextFill, BsHeart, BsBookmark } from "react-icons/bs";

const Post = () => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-4 bg-back">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-12 h-12">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://miro.medium.com/max/1024/1*X2hhWhT8LxskswFNZUsMFg.png"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg">Вася Пупкин</div>
          <div className="font-light text-xs">Санкт-Петербург</div>
        </div>
      </div>

      <div>
        <img
          className="w-full rounded-lg"
          src="https://steamuserimages-a.akamaihd.net/ugc/396707750020595720/B41030072317D3387C66738F0E6FB108BBE898E1/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"
          alt="img"
        />
      </div>
      <div className="p-2 bg-back-lighter rounded-lg shadow -mt-6 mb-4 w-11/12 self-center break-words">
        Description of this photo. Many many many many many symbols...
        Description of this photo. Many many many many many symbols...
        Description of this photo. Many many many many many symbols...
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <CheckButton>
            <BsHeart size={"1.5rem"} />
            <div>0</div>
          </CheckButton>
          <Button variant="outlined">
            <BsChatLeftTextFill size={"1.5rem"} />
            <div>0</div>
          </Button>
        </div>
        <div>
          <CheckButton>
            <BsBookmark size={"1.5rem"} />
          </CheckButton>
        </div>
      </div>
    </div>
  );
};

export default Post;
