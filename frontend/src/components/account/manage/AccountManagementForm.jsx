import React, { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";
import Dropdown from "@/components/ui_elements/Dropdown";
import countryList from "../../data/country_list.json";
import genderList from "../../data/gender_list.json";
import languageList from "../../data/language_list.json";
import { useRouter } from "next/router";

const AccountManagementForm = ({ user }) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    setCountries(countryList);
    setGenders(genderList);
    setLanguages(languageList);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.birthdate) {
        setBirthdate(user.birthdate.slice(0, 10));
      }
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setLanguage(user.language || "");
      setDisplayName(user.display_name || "");
      setCountry(user.country || "");
      setGender(user.gender || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      country: country,
      birthdate: birthdate,
      gender: gender,
      language: language,
    };

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

      // Log the status of the response
      console.log(response.status);
      alert(response.data)

      // After successfully updating account details, make a GET request to fetch updated account information
      const getAccountResponse = await axios.get(
        "http://localhost:3001/getAccountByEmail",
        {
          // Assuming you're using JSON for the request body
          params: {
            email: email,
          },
        }
      );
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(getAccountResponse.data));

    } catch (error) {
      console.error("Error updating account details:", error);
      alert(error.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/deleteAccountByEmail",
        {
          params: {
            email: email, // Pass the email as a query parameter
          },
        }
      );
  
      // Handle different response status codes
      if (response.status === 200) {
        alert("Account deleted successfully");
        localStorage.removeItem('user');
        router.push('/'); // Redirect the user to the home page after successful deletion
      } else {
        console.error("Unexpected status code:", response.status);
        // Handle other unexpected status codes
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex items-center p-2 gap-x-4 rounded-lg">
        <h1 className="font-semibold">Account Details</h1>
      </div>
      <div className="w-full border flex items-center p-2 gap-x-4 rounded-lg">
        <MdAccountCircle size={50} />
        <button className="border-2 px-1 py-0.5 rounded-lg w-24 border-blue-400 text-blue-400">
          Upload
        </button>
        <button className="border-2 px-1 py-0.5 rounded-lg w-24 border-gray-200">
          Remove
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full border grid grid-cols-2 items-center p-4 gap-x-4 gap-y-2 rounded-lg"
      >
        <label htmlFor="name" className="w-full col-span-1">
          <h1 className="font-semibold">Name</h1>
          <input
            value={firstName + " " + lastName}
            disabled={true}
            type="text"
            className="border rounded-lg w-full px-1 py-1"
          />
        </label>
        <div className="">
          <label htmlFor="language" className="w-full col-span-1 font-semibold">
            Language:
          </label>
          {language && (
            <Dropdown
              list={languages}
              selectedItem={language}
              setSelectedItem={setLanguage}
            />
          )}
        </div>
        <label htmlFor="display-name" className="w-full col-span-1">
          <h1 className="font-semibold">Display Name:</h1>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="border rounded-lg w-full px-1 py-1"
          />
        </label>
        <div>
          <label className="block font-semibold">Country:</label>
          {countries && (
            <Dropdown
              list={countries}
              selectedItem={country}
              setSelectedItem={setCountry}
            />
          )}
        </div>
        <label htmlFor="email" className="w-full col-span-2">
          <h1 className="font-semibold">Email</h1>
          <input
            disabled={true}
            value={email}
            type="text"
            className="border rounded-lg w-full px-1 py-1"
          />
        </label>
        <div className="">
          <label htmlFor="language" className="w-full col-span-1 font-semibold">
            Gender:
          </label>
          {genders && (
            <Dropdown
              list={genders}
              selectedItem={gender}
              setSelectedItem={setGender}
            />
          )}
        </div>
        <label htmlFor="birthdate" className="w-full col-span-1">
          <h1 className="font-semibold">Birthdate</h1>
          <input
            disabled={true}
            value={birthdate}
            type="date"
            className="border rounded-lg w-full px-1 py-1"
          />
        </label>

        <div className="flex w-full justify-between text-sm">
          <div className="flex gap-x-2">
            <button
              type="submit"
              className="border-2 px-3 py-1 rounded-lg bg-blue-500 text-white"
            >
              Save Changes
            </button>
            <button
            type="button"
              onClick={() => router.push("/feed")}
              className="border-2 px-3 py-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
          <button type="button" onClick={handleDelete} className="border-2 px-3 py-1 rounded-lg bg-red-700 text-white">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountManagementForm;
