import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreateAccountModal = ({ modal_name }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if(!email || !password) {
        toast("All fields are required")
        return;
      }

      let reqOptions = {
        url: "http://localhost:3001/api/accounts/create",
        method: "POST",
        data: {
          email: email,
          password: password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await axios.request(reqOptions);
      // console.log(response.data);
      toast(response.data)
      document.getElementById(modal_name).close()
    } catch (error) {
      // console.error("Error creating account:", error);
      toast(error.response.data)
    }
  };

  return (
    <dialog id={modal_name} className="modal modal-middle">
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Create your KeebGram account!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>

        {/* Fields */}
        <div className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs bg-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div
              onClick={handleSubmit}
              className="btn btn-success text-white mr-2"
            >
              Create
            </div>
            <button className="btn btn-error text-white">Close</button>
          </form>
        </div>
      </div>
      <Toaster />
    </dialog>
  );
};

export default CreateAccountModal;
