import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Account from "@/functions/Accounts";

const CreateAccountModal = ({ modal_name }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email == "" || password == "") {
      toast.error("All fields required");
      return;
    }
    let results = await Account.create({ email: email, password: password });

    if (results.status === 201) {
      toast.success(results?.data);
      document.getElementById(modal_name).close();
    } else {
      toast.error(results?.response?.data);
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
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
    </dialog>
  );
};

export default CreateAccountModal;
