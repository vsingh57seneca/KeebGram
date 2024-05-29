import React, { useState } from "react";
import axios from "axios";

const FinishSetup = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    country: "",
    birthdate: "",
    displayImage: null,
    gender: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      displayImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", user.email);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("displayName", formData.displayName);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("birthdate", formData.birthdate);
    formDataToSend.append("displayImage", formData.displayImage);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("language", formData.language);

    try {
      const response = await axios.post(
        "http://localhost:3001/updateAccountDetails",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Account details updated:", response.data);
      onComplete(); // Call the onComplete function to indicate setup completion
    } catch (error) {
      console.error("Error updating account details:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Complete Your Account Setup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Display Name:</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Birthdate:</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Display Image:</label>
            <input
              type="file"
              name="displayImage"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Language:</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinishSetup;
