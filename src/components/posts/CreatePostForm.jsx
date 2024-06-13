import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdClose } from "react-icons/md";
import Posts from "@/functions/Posts";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../store";
import fFile from "@/functions/Files";
import socket from "../../../store";
import { DEBUG, API_URL } from "../../../config";

const CreatePostForm = ({
  showModal,
  setShowModal,
  onClose,
  user,
  setPosts,
}) => {
  const MAX_CHAR = 140;
  const [message, setMessage] = useState("");
  const [displayImage, setDisplayImage] = useAtom(displayImageAtom);
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);

  const onCreate = async () => {
    let nextPostId = await Posts.next();

    if (file) {
      try {
        let updatedFile = new File([file], `post_${nextPostId}`, {
          type: file.type,
          lastModified: file.lastModified,
        });

        let results = await fFile.create(updatedFile);
        if (results.status === 200) {
          toast.success("File uploaded successfully");
          setDisplayImage(URL.createObjectURL(file)); // Update display image
          setShowModal(false); // Close the modal after successful upload
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No file selected");
    }

    const data = {
      account_id: user?.account_id,
      content_text: message,
      content_image: file
        ? `${API_URL[DEBUG]}/images/post_${nextPostId}.jpg`
        : null,
      created_at: Date.now(),
    };

    let results = await Posts.create(data);
    console.log(results)
    toast.success(results.data);

    if (results.status === 201) {
      let results = await Posts.getAll();
      setPosts(results);
      setFile(null);
      setMessage("")
      socket.emit('post_created');
      onClose();
    } else {
      toast.error(results);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
    console.log("Selected file:", selectedFile);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="absolute top-0 left-0 flex w-full min-h-screen bg-black/70 z-50">
            <div className="flex md:items-center md:justify-center w-full">
              <div className="bg-white h-fit p-8 rounded w-full md:w-1/2 flex flex-col gap-y-2">
                <label className="font-semibold mb-4">Create A Post</label>

                <div className="flex">
                  <img
                    src={displayImage}
                    className="w-12 h-12 rounded-full object-cover mr-2"
                  />
                  <textarea
                    className="textarea w-5/6 bg-white resize-none"
                    placeholder="Type here..."
                    value={message}
                    maxLength={140}
                    minLength={1}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-xs flex justify-end mr-4">{`${message.length}/${MAX_CHAR}`}</div>

                <input
                  type="file"
                  className={`file-input file-input-xs file-input-success bg-white w-full`}
                  onChange={handleFileChange}
                />

                <div className="flex w-full justify-center">
                  {file && (
                    <>
                      <img
                        src={imageURL}
                        alt=""
                        className="flex w-1/4 rounded border-2"
                      />
                    </>
                  )}
                </div>

                <div className="flex justify-end gap-x-4 mt-5">
                  <button
                    className="btn btn-sm btn-success text-white"
                    onClick={onCreate}
                  >
                    Create
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePostForm;
