import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdImage, MdOutlineEdit } from "react-icons/md";
import Comment from "@/functions/Comments";
import { DEBUG, API_URL } from "../../../config";
import axios from "axios";
import CommentsDisplay from "../comments/CommentsDisplay";
import CreateComment from "../comments/CreateComment";
import socket, { postsAtom, userAtom } from "../../../store";
import { useAtom } from "jotai";
import { GoHeart, GoHeartFill } from "react-icons/go";
import EditPostForm from "./EditPostForm";
import PostActionBar from "./PostActionBar";
import { useRouter } from "next/router";


const PostDisplay = ({ post, owner }) => {
  const [showComments, setShowComments] = useState(false);
  const router = useRouter();

  const handleAvatarClick = () => {
    // Navigate to the user's profile page using their username
    console.log(owner)
    router.push(`/account/${owner.display_name}`);
  };

  return (
    <div className="flex w-full justify-between border">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-4 p-2 w-fit">
            <button className="focus:outline-none" onClick={handleAvatarClick}>
              <img
                src={`${API_URL[0]}/images/avatar_${owner?.account_id}.jpg`}
                className="w-12 h-12 rounded-full object-cover"
                alt="User Avatar"
              />
            </button>
            <div className="flex flex-col">
              <h1 className="font-semibold">{owner?.display_name}</h1>
              <p className="text-xs">{post?.created_at}</p>
            </div>
          </div>
          <div className="w-fit p-4 flex flex-col gap-y-4">
            <p>{post?.content_text}</p>
            <div className="overflow-hidden overflow-y-auto no-scrollbar">
              {post?.content_image && (
                <img
                  className="rounded-lg max-w-[80%]"
                  src={post?.content_image}
                  alt="Post Content"
                />
              )}
            </div>
          </div>
          {showComments && (
            <CommentsDisplay
              post={post}
              showComments={showComments}
              setShowComments={setShowComments}
            />
          )}
        </div>
      </div>
      <div className="">
        <PostActionBar
          post={post}
          setShowComments={setShowComments}
          showComments={showComments}
        />
      </div>
    </div>
  );
};

export default PostDisplay;