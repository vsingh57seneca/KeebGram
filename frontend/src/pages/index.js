import React, { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import AddAccountForm from "../components/AddAccountForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);

  const handleCreateAccountClick = () => {
    setShowAddAccountForm(true);
  };

  const handleFormClose = () => {
    setShowAddAccountForm(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center bg-white text-black">
        <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-x-2">
          <div className="col-span-1 w-full lg:flex justify-end hidden">
            <Image
              className="rounded-lg"
              src="/images/landing-page/custom-keycap.png"
              width={450}
              height={150}
              priority
            />
          </div>
          <div className="lg:col-span-1 col-span-2 p-12 mx-12 text-center lg:w-fit space-y-3 border">
            <h1 className="font-bold text-lg">Welcome to KeebGram</h1>
            <p className="text-sm">Login to continue</p>
            <div className="text-left">
              <label className="font-semibold" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="text-left">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="***************"
              />
            </div>
            <div>
              <button className="text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 rounded w-full hover:shadow-md">
                Sign in
              </button>
              <a className="text-xs text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
            <h1 className="text-xs italic">Don't have an account?</h1>
            <button
              className="text-white bg-green-300 hover:bg-green-500 py-2 px-4 rounded w-full hover:shadow-md"
              onClick={handleCreateAccountClick}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {showAddAccountForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <AddAccountForm onClose={handleFormClose} />
          </div>
        </div>
      )}
    </>
  );
}
