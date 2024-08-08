import React, { useEffect, useState } from "react";
import Posts from "@/functions/Posts";
import toast from "react-hot-toast";
import fFile from "@/functions/Files";
import socket from "../../../store";
import { DEBUG, API_URL } from "../../../config";
import Designs from "@/functions/Designs";
import { Keyboard, Colors } from "../keyboard";
import { useRouter } from "next/router";

const CreatePostForm = ({
  showModal,
  setShowModal,
  onClose,
  user,
  setPosts,
  initialDesign = null  // if design is shared from other user profile
}) => {
  const router = useRouter();
  const MAX_CHAR = 140;
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("image");
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    if (initialDesign) {
        setSelectedDesign(initialDesign);
        setUploadType("keyboard")
    }
  }, [initialDesign]);

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
          setShowModal(false); // Close the modal after successful upload
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload file.");
      }
    }

    const data = {
      account_id: user?.account_id,
      content_text: message,
      content_image: file ? `${API_URL[0]}/images/post_${nextPostId}.jpg` : null,
      created_at: Date.now(),
      design_id: selectedDesign?.design_id || null,
    };

    let results = await Posts.create(data);
    if (results.status === 201) {
      toast.success(results.data);
      let posts = await Posts.getAll();
      if (Array.isArray(posts)) {
        setPosts(posts);
      }
      setFile(null);
      setSelectedDesign(null);
      setMessage("");
      socket.emit("post_created");

      setShowModal(false);
      onClose();
      router.push('/feed');

    } else {
      toast.error("Failed to create post.");
      console.error(results);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
  };

  const handleRadioChange = (event) => {
    setUploadType(event.target.value);
    setFile(null); // Reset file and imageURL when changing upload type
    setImageURL(null);
    setSelectedDesign(null);
  };

  const fetchDesigns = async () => {
    try {
      const designs = await Designs.getDesignsByUserId(user?.account_id);
      if (Array.isArray(designs)) {
        setDesigns(designs);
      } else {
        console.error("Unexpected designs format", designs);
      }
    } catch (error) {
      console.error("Failed to fetch designs", error);
    }
  };

  useEffect(() => {
    if (user?.account_id) {
      fetchDesigns();
    }
  }, [user?.account_id]);

  useEffect(() => {
    console.log(selectedDesign);
  }, [selectedDesign]);

  return (
    <>
      {showModal && (
        <div className="absolute top-0 left-0 flex w-full min-h-screen bg-black/70 z-50">
          <div className="flex md:items-center md:justify-center w-full">
            <div className="bg-white h-fit p-8 rounded w-full md:w-1/2 flex flex-col gap-y-2">
              <label className="font-semibold mb-4">Create A Post</label>

              <div className="flex">
                <img
                  src={`${API_URL[0]}/images/avatar_${user?.account_id}.jpg`}
                  className="w-12 h-12 rounded-full object-cover mr-2"
                  alt="User Avatar"
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

              <div className="flex flex-col gap-y-2">
                <label className="font-semibold">Upload:</label>
                <div className="flex flex-col gap-x-4 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="image"
                      checked={uploadType === "image"}
                      onChange={handleRadioChange}
                    />
                    <span className="ml-2">Image</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="keyboard"
                      checked={uploadType === "keyboard"}
                      onChange={handleRadioChange}
                    />
                    <span className="ml-2">Keyboard Design</span>
                  </label>
                </div>
              </div>

              {uploadType === "image" && (
                <input
                  type="file"
                  className="file-input file-input-xs file-input-success bg-white w-full"
                  onChange={handleFileChange}
                />
              )}

              <div className="flex w-full justify-center">
                {file && (
                  <img
                    src={imageURL}
                    alt="Selected file preview"
                    className="flex w-1/4 rounded border-2"
                  />
                )}
              </div>

              {uploadType === "keyboard" && (
                <div className="flex flex-col gap-y-2">
                  <select
                    className="select w-full max-w-xs bg-white border border-black"
                    onChange={(e) => {
                      const selectedDesign = designs.find(
                        (design) => design.design_name === e.target.value
                      );
                      setSelectedDesign(selectedDesign);
                    }}
                  >
                    <option disabled selected value="">
                      {designs.length > 0 ? (
                        `Choose Design: (${designs.length})`
                      ) : (
                        "No designs created"
                      )}
                    </option>
                    {designs.map((design, index) => (
                      <option key={index} value={design.design_name}>
                        {design.design_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex w-full justify-center scale-50">
                {selectedDesign && (
                  <Keyboard
                    accentColor={Colors[selectedDesign.accents_color]}
                    alphaColor={Colors[selectedDesign.alphas_color]}
                    legendColor={Colors[selectedDesign.legends_color]}
                    modifierColor={Colors[selectedDesign.modifiers_color]}
                  />
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
      )}
    </>
  );
};

export default CreatePostForm;
