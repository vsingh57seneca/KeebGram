import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      alert(response.data);
      onLoginSuccess(username); // Pass username
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        className="text-white bg-blue-300 hover:bg-blue-500 py-2 px-4 rounded w-full hover:shadow-md"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
