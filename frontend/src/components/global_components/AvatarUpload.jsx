import React, { useState } from "react";
import fFile from "@/functions/Files";
import toast from "react-hot-toast";

const AvatarUpload = ({ user, setDisplayImage, showModal, setShowModal }) => {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
    console.log("Selected file:", selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        let updatedFile = new File([file], `avatar_${user.account_id}`, {
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
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="btn btn-success btn-xs text-white"
        onClick={() => setShowModal(true)} // Update this line
      >
        Upload
      </button>
      {showModal && (
        <dialog id="upload_avatar_modal" className="modal" open>
          <div className="modal-box bg-white border-2">
            <h3 className="font-bold text-lg">Upload Display Image</h3>
            <p className="py-4">
              <input
                type="file"
                className="file-input file-input-sm w-full file-input-success bg-white"
                onChange={handleFileChange}
              />
            </p>
            <div className="flex justify-center">
              {imageURL && (
                <img
                  src={imageURL}
                  alt="Selected file"
                  className={`my-4 md:w-[350px] w-200`}
                />
              )}
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-success btn-sm text-white mr-4"
                onClick={handleUpload}
              >
                Upload
              </button>
              <button
                type="button"
                className="btn btn-error btn-sm text-white"
                onClick={onClose} // Close modal on cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AvatarUpload;
