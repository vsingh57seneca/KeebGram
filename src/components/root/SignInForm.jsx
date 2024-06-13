import React, { useState } from "react";
import CreateAccountModal from "./CreateAccountModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {

    if(!email || !password) {
        toast.error("All fields are required")
        return;
      }

    try {
      let reqOptions = {
        url: "http://localhost:3001/api/accounts/login",
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
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push('/feed')
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };

  return (
    <div>
      <div className="border-2 px-3 py-4 flex flex-col items-center rounded-lg mx-8">
        <h1 className="font-bold text-xl">Welcome to KeebGram!</h1>
        <p className="italic font-semibold">Login to continue</p>

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Signin Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-5 btn btn-primary w-full bg-blue-500 text-white hover:bg-blue-700"
        >
          Sign-in
        </button>

        <div className="divider divider-primary divider-start"></div>
        <p className="italic text-xs">Dont have an account?</p>

        {/* Create Account Button */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-success text-white w-full mt-4"
          onClick={() =>
            document.getElementById("create_account_modal").showModal()
          }
        >
          Create Account
        </button>
        <CreateAccountModal modal_name={"create_account_modal"} />
      </div>
    </div>
  );
};

export default SignInForm;
