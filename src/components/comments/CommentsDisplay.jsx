import React, { useEffect, useState } from "react";
import Comment from "@/functions/Comments";
import { MdChatBubbleOutline } from "react-icons/md";
import CreateComment from "./CreateComment";

const CommentsDisplay = ({ post, showComments, setShowComments }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (post_id) => {
    const comments = await Comment.getAll(post_id);

    if (comments?.fieldCount === 0) {
      return;
    } else {
      setComments(comments);
      console.log(comments);
    }
  };

  useEffect(() => {
    if (post?.post_id) {
      fetchComments(post.post_id);
      console.log(`Post ${post?.post_id}`, comments);
    }
  }, [post]);

  return (
    <>
      <div className="p-2">
        <h1 className="font-semibold">Comments</h1>
        <>
          {comments?.map((comment, index) => {
            return (
              <div className="border p-4">
                <div className="flex gap-x-4">
                  <img src={comment?.display_image} />
                  <h1>{comment?.display_name}</h1>
                  <p>{comment?.comment_date}</p>
                </div>
                <p className="p-6">{comment?.content}</p>
              </div>
            );
          })}
        </>
        <CreateComment fetchComments={fetchComments} post={post} setShowComments={setShowComments} showComments={showComments} />
      </div>
    </>
  );
};

export default CommentsDisplay;
