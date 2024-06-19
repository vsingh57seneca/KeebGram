import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { API_URL, DEBUG } from "../../../config";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";
import { useRouter } from "next/router";
import Posts from '@/functions/Posts'
import toast from "react-hot-toast";

const EditPostForm = ({ post }) => {
  const MAX_CHAR = 140;
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [undo, setUndo] = useState(false);

  useEffect(() => {
    console.log(post);
    console.log(user);
    console.log(`${API_URL[0]}/images/avatar_${post?.account_id}`);
  }, []);

  useEffect(() => {
    setContent(post?.content_text);
    setImage(post?.content_image);
  }, [post]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
    console.log("Selected file:", selectedFile);
  };

  useEffect(() => {
    setImage(imageURL);
  }, [imageURL]);

  const handleSubmit = async () => {
    const data = {
      post_id: post?.post_id,
      account_id: user?.account_id,
      content_text: content,
      content_image: image,
      created_at: post?.created_at
    }

    const results = await Posts.edit(data);
    if(results.status === 200) {
      console.log(results?.data)
      toast.success(results?.data)
    } else if (results.status === 400) {
      toast.error(results?.response?.data)
    }
  };

  const handleDelete = async (post_id) => {
    const results = await Posts.delete(post_id);

    if(results.status === 200) {
      toast.success(results?.data)
      router.push('/feed');
    } else if (results.status === 400) {
      toast.error(results?.response?.data)
    }
  }

  return (
    <>
      <h1 className="font-semibold mb-10">Edit Post</h1>
      <div className="m-2">
        <div className="flex items-center gap-x-4 p-2 w-fit">
          <img
            src={`${API_URL[0]}/images/avatar_${user?.account_id}.jpg`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h1 className="font-semibold">{user?.display_name}</h1>
            <p className="text-xs">{post?.created_at}</p>
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
          <div className="overflow-hidden overflow-y-auto no-scrollbar flex justify-center">
            {image && (
              <img
                className="rounded-lg max-w-[30%]"
                src={imageURL ? imageURL : image}
              />
            )}

            <div className="flex flex-col gap-x-4 w-full p-4 gap-y-4">
              <div className="">
                <div className="font-semibold">Upload new file</div>
                <input
                  type="file"
                  className={`file-input file-input-xs file-input-success bg-white w-full`}
                  onChange={handleFileChange}
                />
              </div>
              {image && (
                <button
                  onClick={() => {
                    if (undo === false) {
                      setImage(null);
                      setImageURL("");
                      setUndo(!undo);
                    } else {
                      setImage(post?.content_image);
                      setUndo(!undo);
                    }
                  }}
                  className="btn btn-xs btn-error text-white"
                >
                  {undo ? <p>Undo</p> : <p>Remove Image</p>}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end gap-x-4">
          <button
            className="btn btn-sm text-white btn-error"
            onClick={() => router.push("/feed")}
          >
            Cancel
          </button>
          <button className="btn btn-sm text-white btn-success" onClick={() => handleSubmit()}>Submit</button>
        </div>
      </div>
      <button className="btn btn-sm w-full mt-5 text-white" onClick={() => handleDelete(post?.post_id)}>Delete</button>
    </>
  );
};

export default EditPostForm;
