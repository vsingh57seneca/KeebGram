import React from "react";
import axios from "axios";

function DeleteAccountButton({ username, onDeleteSuccess }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await axios.post(
          "http://localhost:3001/deleteAccount",
          { username }
        );
        alert(response.data);
        onDeleteSuccess();
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Error deleting account.");
      }
    }
  };

  return (
    <button
      className="text-white bg-red-300 hover:bg-red-500 py-2 px-4 rounded w-full hover:shadow-md mt-3"
      onClick={handleDelete}
    >
      Delete Account
    </button>
  );
}

export default DeleteAccountButton;
