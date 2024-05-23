import React, { useState } from "react";
import axios from "axios";

// Component to add a new account
function AddAccountForm({ onClose }) {
  // State hooks to manage form input values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Object representing the new account details
    const newAccount = {
      username,
      email,
      password,
    };

    try {
      // Send a POST request to the backend to add the new account
      const response = await axios.post(
        "http://localhost:3001/addAccount",
        newAccount
      );
      alert(response.data); // Alert the response from the server
      onClose(); // Close the form
    } catch (error) {
      console.error("Error adding account:", error); // Log any errors
      alert("Error adding account."); // Alert the user of an error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update the username state on input change
          required
          placeholder="Username" // Placeholder text
        />
      </div>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
          required
          placeholder="Email" // Placeholder text
        />
      </div>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="new-password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update the password state on input change
          required
          placeholder="Password" // Placeholder text
        />
      </div>
      <button
        className="text-white bg-green-300 hover:bg-green-500 py-2 px-4 rounded w-full hover:shadow-md"
        type="submit"
      >
        Create Account
      </button>
      <button
        className="text-white bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded w-full hover:shadow-md mt-3"
        onClick={onClose} // Call the onClose function when the cancel button is clicked
      >
        Cancel
      </button>
    </form>
  );
}

export default AddAccountForm;
