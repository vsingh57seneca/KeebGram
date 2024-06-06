import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdImage } from "react-icons/md";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../store";
const PostDisplay = ({ post }) => {
  const [displayImage, setDisplayImage] = useAtom(displayImageAtom);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    setDisplayImage(`http://localhost:3001/images/avatar_${user?.account_id}.jpg`)
  }, [user]);
  return (
    // <div className=''>{post?.content_text}</div>
    <>
      <div className="border lg:w-3/5 flex flex-col p-4 gap-y-2 lg:max-w-[50%]">
        <div className="flex items-center gap-x-4">
          <img
            src={displayImage}
            className="w-12 h-12 rounded-full object-cover"
          />
          <p>{post.created_at}</p>
        </div>
        <div className="">
            <img
              width={300}
              src={post?.content_image}
            />
        </div>
        <div className="">{post.content_text}</div>
      </div>
    </>
  );
};

export default PostDisplay;
