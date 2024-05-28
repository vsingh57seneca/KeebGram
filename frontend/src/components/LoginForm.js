import React, { useState } from "react";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      
      if (response.status == 200) {
        // alert(response.data);
        const userObject = response.data;
        console.log(userObject)
        // Save the user object to localStorage
        localStorage.setItem("user", JSON.stringify(userObject));
        onLoginSuccess(email); // Pass username
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-left mb-3">
        <label className="font-semibold" htmlFor="username">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          value={email}
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