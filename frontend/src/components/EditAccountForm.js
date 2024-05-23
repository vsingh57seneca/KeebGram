import React, { useState } from "react";
import axios from "axios";

function EditAccountForm({ username, onUpdateSuccess, onClose }) {
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAccount = {
      username,
      newUsername,
      newEmail,
      newPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/updateAccount",
        updatedAccount
      );
      alert(response.data);
      onUpdateSuccess(newUsername);
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Error updating account.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-username">
          New Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-username"
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
      </div>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-email">
          New Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-email"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
      </div>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-password">
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="text-white bg-green-300 hover:bg-green-500 py-2 px-4 rounded w-full hover:shadow-md"
        type="submit"
      >
        Update Account
      </button>
      <button
        className="text-white bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded w-full hover:shadow-md mt-3"
        onClick={onClose}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditAccountForm;
