import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdImage } from "react-icons/md";
import Like from '@/functions/Likes';

import { DEBUG, API_URL } from "../../../config";

const handleLikePost = async (postId, accountId) => {
  console.log(`inside handleLikePost with post_id: ${postId} and account_id: ${accountId}`);
  if (postId) {
    let response = await Like.add(postId, accountId);
    console.log(response);
  }
}

const PostDisplay = ({ post, owner }) => {
  return (
    <>
      <div className="relative border w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 p-2">
            <img
              src={`${API_URL[DEBUG]}/images/avatar_${owner?.account_id}.jpg`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold">{owner?.display_name}</h1>
              <p className="text-xs">{post?.created_at}</p>
            </div>
          </div>
          <div className="w-fit p-4 flex flex-col gap-y-4">
            <p>{post?.content_text}</p>
            <div className="max-h-96 overflow-hidden overflow-y-auto no-scrollbar">
              {post?.content_image && (
                <img
                  className="rounded-lg"
                  src={post?.content_image}
                  width={300}
                />
              )}
            </div>
            <div className="absolute bottom-2 right-2 cursor-pointer" onClick={() => handleLikePost(post?.post_id, owner?.account_id)}>
          <img 
          src="/images/like/thumbs-up.png" 
          alt="Thumbs Up" 
          className="w-6 h-6"
          />
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDisplay;
