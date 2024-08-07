import { useAtom } from "jotai";
import React, { useState, useEffect } from "react";
import { userAtom } from "../../../store";
import { MdOutlineEdit, MdReport } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Like from "@/functions/Likes";
import ReportDisplay from "@/components/reports/ReportDisplay";
import ShowCommentsButton from "../comments/ShowCommentsButton";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import socket from "../../../store";

const PostActionBar = ({ post, showComments, setShowComments }) => {
  const [user, setUser] = useAtom(userAtom);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showReportsModal, setShowReportsModal] = useState(false);
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

          socket.emit('post_liked', {post: post, user: user })
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

  const handleCloseModal = () => {
    setShowReportsModal(false);
  };

  useEffect(() => {
    isPostLiked(post?.post_id, user?.account_id);
    getLikeCount(post?.post_id);
  }, [post, likeCount, user]);

  return (
    <>
    <ReportDisplay
     onClose={handleCloseModal}
     id={post?.post_id}
     type={"post"}
     setShowModal={setShowReportsModal}
     showModal={showReportsModal} 
     />
    <div>
      <div className="p-2 flex flex-col gap-y-4 items-end ">
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0 ${
            post?.account_id != user?.account_id && "hidden"
          }`}
        >
          <div>
          <MdOutlineEdit
            size={25}
            onClick={() => router.push(`/posts/edit/${post?.post_id}`)}
          />
          </div>
        </motion.div>
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0 items-center`}
          onClick={() =>
          {
            if(post?.account_id != user?.account_id)
            {
              handleLikePost(post?.post_id, user?.account_id, liked, setLiked)
            }
          }
          }
        >
          <p>{likeCount > 0 && `${likeCount}`}</p>
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
        <motion.div
          whileHover={{ rotateZ: 360, scale: 1.5 }}
          transition={{ duration: 0.5 }}
          className={`cursor-pointer flex hover:text-green-500 ease-in-out transition-all duration-0`}
          onClick={() => setShowReportsModal(!showReportsModal)}
        >
          <MdReport className="text-red-500" size={30}/>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default PostActionBar;
