import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { userAtom } from "../../../store";
import { MdOutlineEdit } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Like from "@/functions/Likes";
import ShowCommentsButton from "../comments/ShowCommentsButton";
import EditPostForm from "./EditPostForm";
import { useRouter } from "next/router";

const PostActionBar = ({ post, showComments, setShowComments }) => {
  const [user, setUser] = useAtom(userAtom);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const handleLikePost = async (postId, accountId, liked, setLiked) => {
    console.log(
      `inside handleLikePost with post_id: ${postId} and account_id: ${accountId}`
    );
    if (postId) {
      if (liked) {
        let response = await Like.delete(postId, accountId);
        console.log(response);
        if (response.status === 200) {
          setLiked(false);
        }
      } else {
        let response = await Like.add(postId, accountId);
        console.log(response);
        if (response.status === 201) {
          setLiked(true);
        }
      }
    }
  };

  const isPostLiked = async (post_id, account_id) => {
    const liked = await Like.isPostLiked(post_id, account_id);
    setLiked(liked);
  };

  useEffect(() => {
    isPostLiked(post?.post_id, user?.account_id);
  }, [post, user]);

  return (
    <div>
      <div className="p-2 flex flex-col gap-y-4">
        <div
          className={`cursor-pointer flex ${
            post?.account_id != user?.account_id && "hidden"
          }`}
        >
          {/* <MdOutlineEdit size={25} /> */}
          <MdOutlineEdit size={25} onClick={() => router.push(`/posts/edit/${post?.post_id}`)}/>
        </div>
        <div
          className={`cursor-pointer flex ${
            post?.account_id == user?.account_id && "hidden"
          }`}
          onClick={() =>
            handleLikePost(post?.post_id, user?.account_id, liked, setLiked)
          }
        >
          {liked ? (
            <GoHeartFill className="text-red-500" size={25} />
          ) : (
            <GoHeart size={25} />
          )}
        </div>
        <div className="">
         <ShowCommentsButton showComments={showComments} setShowComments={setShowComments} />
        </div>
      </div>
    </div>
  );
};

export default PostActionBar;
