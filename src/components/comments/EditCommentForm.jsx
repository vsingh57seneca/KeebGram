import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { API_URL, DEBUG } from "../../../config";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { useRouter } from "next/router";
import Comments from "@/functions/Comments";
import toast from "react-hot-toast";

const EditCommentForm = ({ comment }) => {
  const MAX_CHAR = 140;
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(comment?.content);
  }, [comment]);

  const handleSubmit = async () => {
    const data = {
      comment_id: comment?.comment_id,
      post_id: comment?.post_id,
      account_id: user?.account_id,
      content: content,
      comment_date: comment?.comment_date
    }

    const results = await Comments.edit(data);
    if(results.status === 200) {
      console.log(results?.data)
      toast.success(results?.data)
    } else if (results.status === 400) {
      toast.error(results?.response?.data)
    }
  };

  const handleDelete = async (comment_id) => {
    const results = await Comments.delete(comment_id);

    if(results.status === 200) {
      toast.success(results?.data)
      router.push('/feed');
    } else if (results.status === 400) {
      toast.error(results?.response?.data)
    }
  }

  return (
    <>
      <h1 className="font-semibold mb-10">Edit Comment</h1>
      <div className="m-2">
        <div className="flex items-center gap-x-4 p-2 w-fit">
          <img
            src={`${API_URL[0]}/images/avatar_${user?.account_id}.jpg`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user?.display_name}</h1>
            <p className="text-xs">{comment?.comment_date}</p>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-y-4">
          <textarea
            className="textarea bg-white resize-none border border-black"
            placeholder="Type here..."
            value={content}
            maxLength={140}
            minLength={1}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className="text-xs flex justify-end mr-4">{`${content?.length}/${MAX_CHAR}`}</div>
        </div>
        <div className="flex w-full justify-end gap-x-4">
          <button
            className="btn btn-sm text-white btn-error"
            onClick={() => router.push("/feed")}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm text-white btn-success"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
      <button
        className="btn btn-sm w-full mt-5 text-white"
        onClick={() => handleDelete(comment?.comment_id)}
      >
        Delete
      </button>
    </>
  );
};

export default EditCommentForm;
