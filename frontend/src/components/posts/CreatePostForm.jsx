import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdClose } from "react-icons/md";
import Posts from "@/functions/Posts";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../store";
import fFile from '@/functions/Files'

const CreatePostForm = ({
  showCreatePostModal,
  onClose,
  user,
  posts,
  setPosts,
}) => {
  const MAX_CHAR = 140;
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [displayImage, setDisplayImage] = useAtom(displayImageAtom);
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onCreate = async () => {
    let nextPostId = await Posts.next();

    console.log(nextPostId)

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
      account_id: user.account_id,
      content_text: message,
      content_image: file ? `http://localhost:3001/images/post_${nextPostId}.jpg` : null,
      created_at: Date.now(),
    };

    let results = await Posts.create(data);
    toast.success(results.data);

    if (results.status === 201) {
      let results = await Posts.getAll();
      setPosts(results.data.reverse());
      setFile(null);
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
      {showCreatePostModal && (
        <>
          <div className="absolute flex w-full h-[calc(100%-52px)] bg-black/70 justify-center md:hidden z-50">
            <div className="bg-white h-2/5 w-full">
              <div className="mt-8 flex flex-col m-2">
                <label className="font-semibold mb-4">Create A Post</label>
                <div className="flex mx-4">
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
                <div className="text-xs flex justify-end mr-4 mt-1">{`${message.length}/${MAX_CHAR}`}</div>
                <div className="lg:ml-16 mt-4 mx-4">
                  <input
                    type="file"
                    className="file-input file-input-xs file-input-success bg-white w-full"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex justify-end mt-4 mr-4 gap-x-4">
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

          <div className="absolute md:flex w-full h-full bg-black/70 justify-center items-center hidden z-50">
            <div className="bg-white h-3/6 w-3/4 lg:w-2/4 rounded">
              <div
                className="flex justify-between m-4 cursor-pointer items-center"
                onClick={onClose}
              >
                <label className="font-semibold">Create A Post</label>
                <MdClose />
              </div>
              <div className="mt-4 flex flex-col h-full">
                <div className="lg:ml-16 mt-4 mx-4">
                  <input
                    type="file"
                    className="bg-white w-full"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex mx-4 gap-x-2">
                  <img
                    src={displayImage}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="border-2 rounded-lg w-full h-full mt-4">
                    <textarea
                      className="textarea w-full resize-none bg-white h-full"
                      placeholder="Type here..."
                      value={message}
                      maxLength={140}
                      minLength={1}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="text-xs flex justify-end mr-4 mt-6">{`${message.length}/${MAX_CHAR}`}</div>
                <div className="flex justify-end mt-12 md:mt-16 mr-4 gap-x-4">
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
