import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dropdown from "./ui_elements/Dropdown";
import countryList from "./data/country_list.json";
import genderList from "./data/gender_list.json";
import languageList from "./data/language_list.json";

const FinishSetup = ({ user, onComplete }) => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setCountries(countryList);
    setGenders(genderList);
    setLanguages(languageList);
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    country: "",
    birthdate: "",
    gender: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // For regular input fields, update the formData directly
    if (name !== "gender" && name !== "language") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // For gender and language dropdowns, update the respective state
      if (name === "gender") {
        setGender(value); // Update gender state
      } else if (name === "language") {
        setLanguage(value); // Update language state
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("email", user.email);
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("displayName", formData.displayName);
    formDataToSend.append("country", selectedCountry);
    formDataToSend.append("birthdate", formData.birthdate);
    formDataToSend.append("gender", gender);
    formDataToSend.append("language", language);

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
      console.log(response.status);

      if (response.status === 200) {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        user.setup_finished = 1;
        const updatedUser = JSON.stringify(user);
        localStorage.setItem("user", updatedUser);
        console.log("Send to /feed");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating account details:", error);
      alert(error.response.data);
    }
  };

  return (
    <div className="flex rounded-md items-center justify-center">
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
            {countries && (
              <Dropdown
                list={countries}
                selectedItem={selectedCountry}
                setSelectedItem={setSelectedCountry}
              />
            )}
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
            <label className="block text-sm mb-1">Gender:</label>
            {genders && (
              <Dropdown 
                list={genders}
                selectedItem={gender}
                setSelectedItem={setGender}
              />
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Language:</label>
            {languages && (
              <Dropdown 
                list={languages}
                selectedItem={language}
                setSelectedItem={setLanguage}
              />
            )}
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
