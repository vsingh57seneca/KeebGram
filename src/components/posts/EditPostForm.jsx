import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { API_URL, DEBUG } from "../../../config";
import { useAtom } from "jotai";
import { userAtom } from "../../../store";

const EditPostForm = ({ post }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [user, setUser] = useAtom(userAtom)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
    console.log("Selected file:", selectedFile);
  };

  const handleClose = () => {
    setImageURL(post?.content_image);
    setContent(post?.content_text);
  };

  useEffect(() => {
    console.log(post);
    setImageURL(post?.content_image);
    setContent(post?.content_text);
  }, []);

  return (
    <div>
      <MdOutlineEdit
        size={25}
        onClick={() => document.getElementById("edit_post_modal").showModal()}
      />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="edit_post_modal" className="modal modal-top sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Edit Post!</h3>


          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => handleClose()} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EditPostForm;
