import React, { useState } from "react";
import Image from "next/image";
import LoginForm from "../components/LoginForm";
import AddAccountForm from "../components/AddAccountForm";
import DeleteAccountButton from "../components/DeleteAccountButton";
import EditAccountForm from "../components/EditAccountForm";

export default function Home() {
  // track if a user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // control the visibility of the add account form
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);

  // control the visibility of the edit account form
  const [showEditAccountForm, setShowEditAccountForm] = useState(false);

  // store the logged in username
  const [username, setUsername] = useState("");

  // successful login
  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  // logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  // successful account deletion
  const handleDeleteSuccess = () => {
    setIsLoggedIn(false);
    setUsername("");
    alert("Account deleted successfully");
  };

  //  successful account edit
  const handleUpdateSuccess = (newUsername) => {
    setUsername(newUsername);
    setShowEditAccountForm(false);
    alert("Account updated successfully");
  };

  return (
    <div className="min-h-screen flex items-center bg-white text-black">
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-x-2">
        <div className="col-span-1 w-full lg:flex justify-end hidden">
          <Image
            className="rounded-lg"
            src="/images/landing-page/custom-keycap.png"
            width={450}
            height={150}
            fetchPriority=""
          />
        </div>

        <div className="lg:col-span-1 col-span-2 p-12 mx-12 text-center lg:w-fit space-y-3 border">
          <h1 className="font-bold text-lg">Welcome to KeebGram</h1>

          {isLoggedIn ? (
            <>
              <p className="text-sm">Logged in as {username}</p>
              <button
                className="text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 rounded w-full hover:shadow-md"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="text-white bg-yellow-300 hover:bg-yellow-500 py-2 px-4 rounded w-full hover:shadow-md mt-3"
                onClick={() => setShowEditAccountForm(true)}
              >
                Edit Account
              </button>
              <DeleteAccountButton
                username={username}
                onDeleteSuccess={handleDeleteSuccess}
              />
              {showEditAccountForm && (
                <EditAccountForm
                  username={username}
                  onUpdateSuccess={handleUpdateSuccess}
                  onClose={() => setShowEditAccountForm(false)}
                />
              )}
            </>
          ) : (
            <>
              <p className="text-sm">Login to continue</p>
              <LoginForm onLoginSuccess={handleLoginSuccess} />
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300" />
              <h1 className="text-xs italic">Don't have an account?</h1>
              <button
                className="text-white bg-green-300 hover:bg-green-500 py-2 px-4 rounded w-full hover:shadow-md"
                onClick={() => setShowAddAccountForm(true)}
              >
                Create Account
              </button>
              {showAddAccountForm && (
                <AddAccountForm onClose={() => setShowAddAccountForm(false)} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
