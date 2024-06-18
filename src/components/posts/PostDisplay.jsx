import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdImage, MdOutlineEdit } from "react-icons/md";
import Like from "@/functions/Likes";
import Comment from "@/functions/Comments";
import { DEBUG, API_URL } from "../../../config";
import axios from "axios";
import CommentsDisplay from "../comments/CommentsDisplay";
import CreateComment from "../comments/CreateComment";
import socket, { postsAtom, userAtom } from "../../../store";
import { useAtom } from "jotai";
import { GoHeart, GoHeartFill } from "react-icons/go";

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

const PostDisplay = ({ post, owner }) => {
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [posts, setPosts] = useAtom(postsAtom);
  const [user, setUser] = useAtom(userAtom);

  const fetchComments = async (post_id) => {
    const comments = await Comment.getAll(post_id);

    if (comments?.fieldCount === 0) {
      return;
    } else {
      setComments(comments);
    }
  };

  const isPostLiked = async (post_id, account_id) => {
    const liked = await Like.isPostLiked(post_id, account_id);
    setLiked(liked);
  }

  useEffect(() => {
    fetchComments(post?.post_id);
  }, [post]);

  useEffect(() => {
    isPostLiked(post?.post_id, user?.account_id);
  }, [post, user]);

  return (
    <>
      <div className="flex border w-full justify-between">
        <div className="relative w-full">
          <div className="flex flex-col">
            <div className="flex items-center gap-x-4 p-2 w-fit">
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
                    className="rounded-lg w-fit"
                    src={post?.content_image}
                    width={300}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="p-2 w-full">
            {comments.length > 0 && (
              <CommentsDisplay
                comments={comments}
                setShowComments={setShowComments}
                showComments={showComments}
                post={post}
              />
            )}
          </div>

          <div className="flex mt-2 w-full">
            <CreateComment
              post={post}
              setShowComments={setShowComments}
              showComments={showComments}
              fetchComments={fetchComments}
            />
          </div>
        </div>
        <div className="p-2 flex flex-col gap-y-4">
          <div
            className={`cursor-pointer flex ${
              post?.account_id != user?.account_id && "hidden"
            }`}
          >
            <MdOutlineEdit size={25} />
          </div>
          <div
            className={`cursor-pointer flex ${
              post?.account_id == user?.account_id && "hidden"
            }`}
            onClick={() => handleLikePost(post?.post_id, user?.account_id, liked, setLiked)}
          >
             {liked ? (
              <GoHeartFill className="text-red-500" size={25} />
            ) : (
              <GoHeart size={25} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDisplay;
