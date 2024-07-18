import React, { useEffect, useState } from "react";
import Comment from "@/functions/Comments";
import { MdChatBubbleOutline } from "react-icons/md";
import CreateComment from "./CreateComment";
import CommentActionBar from "./CommentActionBar";

const CommentsDisplay = ({ post, showComments, setShowComments }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async (post_id) => {
    const comments = await Comment.getAll(post_id);

    if (comments?.fieldCount === 0) {
      return;
    } else {
      setComments(comments);
      // console.log(comments);
    }
  };

  useEffect(() => {
    if (post?.post_id) {
      fetchComments(post.post_id);
      // console.log(`Post ${post?.post_id}`, comments);
    }
  }, [post]);

  // console.log(comments)

  return (
    <>
      <div className="p-2">
        <h1 className="font-semibold">Comments</h1>
        <>
          {comments?.map((comment, index) => {
            return (
              <div className="border">
                <div className="flex gap-x-4 items-center justify-between">
                  <div className="">
                    <img src={comment?.display_image} />
                    <h1>{comment?.display_name}</h1>
                  </div>
                  <CommentActionBar comment={comment} />
                </div>
                <p className="text-xs">{comment?.comment_date}</p>
                <p className="pt-5 break-words whitespace-pre-wrap">
                  {comment?.content}
                </p>
              </div>
            );
          })}
        </>
        <CreateComment
          fetchComments={fetchComments}
          post={post}
          setShowComments={setShowComments}
          showComments={showComments}
        />
      </div>
    </>
  );
};

export default CommentsDisplay;
