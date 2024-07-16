import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { userAtom } from "../../../store";
import { MdOutlineEdit } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Like from "@/functions/Likes";
import ShowCommentsButton from "../comments/ShowCommentsButton";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const PostActionBar = ({ post, showComments, setShowComments }) => {
  const [user, setUser] = useAtom(userAtom);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
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

  const getLikeCount = async (post_id) => {
    const count = await Like.getLikesCount(post?.post_id);
    setLikeCount(count);
  };

  useEffect(() => {
    isPostLiked(post?.post_id, user?.account_id);
    getLikeCount(post?.post_id);
  }, [post, likeCount, user]);

  return (
    <div>
      <div className="p-2 flex flex-col gap-y-4">
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0 ${
            post?.account_id != user?.account_id && "hidden"
          }`}
        >
          <div>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}  onClick={() => router.push(`/posts/edit/${post?.post_id}`)}>{likeCount} 
            <GoHeartFill className="text-red-500" size={15}/>
            </span>
          <br/>
          <MdOutlineEdit
            size={25}
            onClick={() => router.push(`/posts/edit/${post?.post_id}`)}
          />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0 ${
            post?.account_id == user?.account_id && "hidden"
          }`}
          onClick={() =>
            handleLikePost(post?.post_id, user?.account_id, liked, setLiked)
          }
        >
          { liked ? (
            <GoHeartFill className="text-red-500" size={25} />
          ) : (
            <GoHeart size={25} />
          )}
        </motion.div>
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0`}
        >
          <ShowCommentsButton
            showComments={showComments}
            setShowComments={setShowComments}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PostActionBar;
