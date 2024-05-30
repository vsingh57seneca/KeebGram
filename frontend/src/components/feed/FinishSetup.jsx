import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import countryList from "../data/country_list.json";
import genderList from "../data/gender_list.json";
import languageList from "../data/language_list.json";
import toast, { Toaster } from "react-hot-toast";

const FinishSetup = ({ user }) => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    setCountries(countryList);
    setGenders(genderList);
    setLanguages(languageList);

    document.getElementById("finish_setup_modal").showModal();
  }, []);

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

      updateLocalStorage()
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
      if(response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        toast("Account setup finished")
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      // Handle errors
      toast(error.response.data)
    }
  };

  return (
    <div className="flex rounded-md items-center justify-center">
      <dialog id="finish_setup_modal" className="modal">
        <div className="modal-box bg-white overflow-y-hidden">
          <h3 className="font-bold text-lg">Finish account setup!</h3>
          <p className="py-4">Please enter the following information</p>

          {/*  */}
          <div className="flex gap-x-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full bg-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className="">
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

          <div className="flex gap-x-2">
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

          <div className="flex gap-x-2 items-center">
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
              <input
                type="date"
                placeholder="YYYY-MM-DD"
                className="input input-sm input-bordered w-full bg-white"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-success mt-4 text-white w-full"
          >
            Confirm
          </button>
        </div>
        <Toaster />
      </dialog>
    </div>
  );
};

export default FinishSetup;
