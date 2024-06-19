import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import socket, { userAtom } from "../../../store";
import Comment from '@/functions/Comments'
import toast from "react-hot-toast";

const CreateComment = ({ showComments, setShowComments, post, fetchComments }) => {
  const [content, setContent] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const MAX_CHAR = 140;

  useEffect(() => {
    if (content.length > 0) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }, [content]);

  useEffect(() => {
    socket.on("refresh_comments", () => {
    //   console.log("Refresh comments");
        fetchComments(post?.post_id)
    });
  }, [socket]);

  const handleSubmit = async () => {
    const comment = {
        post_id: post?.post_id,
        account_id: user?.account_id,
        content: content,
    }

    let results = await Comment.create(comment);

    if(results?.status === 201) {
        toast.success(results?.data)
        setContent("");
        socket.emit('comment_created')
        fetchComments(post?.post_id);
    } else {
        toast.error(results?.response?.data)
    }
    
  }

  return (
    <div className="flex flex-col gap-x-4 w-full p-2">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Comment here.."
          className="input input-bordered input-sm w-5/6 bg-white resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={140}
          
        />
        <button
          className={`bg-green-300 p-2 rounded hover:bg-green-600 flex ${
            !showSubmit && "hidden"
          }`}
          onClick={() => handleSubmit()}
        >
          <AiOutlineEnter />
        </button>
      </div>
      <div
        className={`text-xs flex justify-end mr-4 mt-2 ${
          !showSubmit && "hidden"
        }`}
      >{`${content.length}/${MAX_CHAR}`}</div>
    </div>
  );
};

export default CreateComment;
