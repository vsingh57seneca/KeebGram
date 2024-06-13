import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdImage } from "react-icons/md";

import { DEBUG, API_URL } from "../../../config";

const PostDisplay = ({ post, owner }) => {
  return (
    <>
      <div className="border w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 p-2">
            <img
              src={`${API_URL[DEBUG]}/api/images/avatar_${owner?.account_id}.jpg` ? `${API_URL[DEBUG]}/api/images/avatar_${owner?.account_id}.jpg` : <MdAccountCircle />}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold">{owner?.display_name}</h1>
              <p className="text-xs">{post.created_at}</p>
            </div>
          </div>
          <div className="w-fit p-4 flex flex-col gap-y-4">
            <p>{post.content_text}</p>
            <div className="max-h-96 overflow-hidden overflow-y-auto no-scrollbar">
              {post?.content_image && (
                <img
                  className="rounded-lg"
                  src={post?.content_image}
                  width={300}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDisplay;
