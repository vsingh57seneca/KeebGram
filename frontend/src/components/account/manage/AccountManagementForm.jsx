import React, { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import axios from "axios";
import countryList from "../../data/country_list.json";
import genderList from "../../data/gender_list.json";
import languageList from "../../data/language_list.json";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

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

  const handleSubmit = async () => {
    console.log(
      firstName,
      lastName,
      displayName,
      country,
      language,
      gender,
      birthdate
    );
    try {
      if (
        firstName === "" ||
        lastName === "" ||
        displayName === "" ||
        country === "" ||
        language === "" ||
        gender === "" ||
        birthdate === ""
      ) {
        toast("All fields required");
        return;
      }

      let reqOptions = {
        url: "http://localhost:3001/api/accounts/update",
        method: "POST",
        data: {
          firstName: firstName,
          lastName: lastName,
          displayName: displayName,
          country: country,
          birthdate: birthdate,
          gender: gender,
          language: language,
          email: user?.email,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await axios.request(reqOptions);
      console.log(response.data);
      toast(response.data);

      updateLocalStorage();
      // document.getElementById(modal_name).close();
    } catch (error) {
      console.error("Error creating account:", error);
      toast(error.response.data);
    }
  };

  const updateLocalStorage = async () => {
    try {
      // Construct the URL with the email parameter
      let url = `http://localhost:3001/api/accounts/getOneByEmail?email=${user?.email}`;

      // Send a GET request to the server
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // Handle errors
      toast(error.response.data);
    }
  };

  const handleCancel = () => {
    router.push("/feed");
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/accounts/delete",
        {
          params: {
            email: email, // Pass the email as a query parameter
          },
        }
      );

      // Handle different response status codes
      if (response.status === 200) {
        toast("Account deleted successfully");
        router.push("/"); // Redirect the user to the home page after successful deletion
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
    <div className="min-h-screen flex flex-col gap-y-4 h-full">
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

      <div className="w-full border flex flex-col items-center p-2 gap-x-4 rounded-lg">
        <div className="w-full flex gap-x-4 items-center">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <p className="border p-2 rounded w-full bg-gray-200">
              {firstName + " " + lastName}
            </p>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Country</span>
            </div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 w-full bg-white text-black hover:bg-white"
              >
                {country ? country : "Select Country"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow w-fit rounded-box bg-white overflow-y-auto h-[150px]"
              >
                {countries.map((country, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setCountry(country.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {country.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </label>
        </div>

        <div className="flex w-full gap-x-4 items-center">
          <div className="w-full">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Display Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Language</span>
            </div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 w-full bg-white text-black hover:bg-white"
              >
                {language ? language : "Select Language"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px]"
              >
                {languages.map((lang, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setLanguage(lang.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {lang.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </label>
        </div>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <p className="border p-2 rounded w-full bg-gray-200">{email}</p>
        </label>

        <div className="flex w-full gap-x-4 items-center">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm m-1 w-full bg-white text-black hover:bg-white"
              >
                {gender ? gender : "Select Gender"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[200px]"
              >
                {genders.map((gend, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setGender(gend.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {gend.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Birthdate</span>
            </div>
            <p className="border p-2 rounded w-full bg-gray-200">{birthdate}</p>
          </label>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-x-4">
          <button onClick={handleSubmit} className="btn btn-success text-white">
            Update
          </button>
          <button onClick={handleCancel} className="btn btn-error text-white">
            Cancel
          </button>
        </div>
        <button onClick={handleDelete} className="btn btn-warning">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AccountManagementForm;
