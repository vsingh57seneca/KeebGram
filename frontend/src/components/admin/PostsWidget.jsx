import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useAtom } from "jotai";
import { postsAtom } from "../../../store";

const PostsWidget = () => {
  const [posts, setPosts] = useAtom(postsAtom);

  return (
    <div className="stats shadow w-full bg-white text-black">
      <div className="stat">
        <div className="stat-title">Posts</div>
        <div className="stat-value">
          {posts?.length > 0 ? posts?.length : "0"}
        </div>
        <div className="flex justify-between">
          <div className="stat-desc">Total Posts</div>
          <div className="flex gap-x-2 items-center cursor-pointer">
            <div className="stat-desc">Posts</div>
            <FaExternalLinkAlt size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsWidget;
