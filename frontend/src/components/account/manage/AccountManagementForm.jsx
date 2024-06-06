import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import countryList from "../../data/country_list.json";
import genderList from "../../data/gender_list.json";
import languageList from "../../data/language_list.json";
import Account from "../../../functions/Accounts.js";
import AvatarUpload from "@/components/global_components/AvatarUpload";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../../store";

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
  const [displayImage, setDisplayImage] = useAtom(displayImageAtom);

  const [showModal, setShowModal] = useState(false);

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
      setDisplayImage(
        `http://localhost:3001/images/avatar_${user.account_id}.jpg`
      );
    }
  }, [user]);

  const handleSubmit = async () => {
    let response = await Account.update({
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
      country: country,
      birthdate: birthdate,
      gender: gender,
      language: language,
      email: user?.email,
    });

    console.log(response);

    toast(response.data);

    if (response.status === 200) {
      response = await Account.getOne(user?.email);
    }
  };

  const handleCancel = () => {
    router.push("/feed");
  };

  const handleDelete = async () => {
    let response = await Account.delete(user?.email);
    if (response.status === 200) {
      toast.success(response.data);
      router.push("/"); // Redirect the user to the home page after successful deletion
    }
  };

  return (
    <>
      <div className="min-h-screen overflow-y-auto p-4 mb-10 md:mb-0">
        <div className="grid grid-cols-3 gap-y-4 my-4">
          <div className="col-span-3">
            <h1 className="font-semibold">Account Details</h1>
          </div>

          <div className="col-span-3">
            <div className="w-full border flex items-center p-2 gap-x-4 rounded-lg">
            <img src={displayImage} className="w-16 h-16 rounded-full object-cover" />
              <AvatarUpload
                user={user}
                setDisplayImage={setDisplayImage}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              <button className="border-2 px-1 py-0.5 rounded-lg w-24 border-gray-200">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 my-4 border rounded-lg p-2 gap-x-4">
          <div className="col-span-2 md:col-span-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <div className="border p-1 rounded w-full bg-gray-200">
                <p className="ml-1">{firstName + " " + lastName}</p>
              </div>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1 z-10">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Country</span>
              </div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm w-full bg-white text-black hover:bg-white"
                >
                  {country ? country : "Select Country"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px]"
                >
                  {countries.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => setCountry(country.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Display Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full bg-white"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Language</span>
              </div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm w-full bg-white text-black hover:bg-white"
                >
                  {language ? language : "Select Language"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px]"
                >
                  {languages.map((lang, index) => (
                    <li
                      key={index}
                      onClick={() => setLanguage(lang.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          </div>

          <div className="col-span-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <p className="border p-1 rounded w-full bg-gray-200">{email}</p>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-sm w-full bg-white text-black hover:bg-white"
                >
                  {gender ? gender : "Select Gender"}
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-fit"
                >
                  {genders.map((gend, index) => (
                    <li
                      key={index}
                      onClick={() => setGender(gend.name)}
                      className="w-full hover:bg-gray-300 rounded"
                    >
                      {gend.name}
                    </li>
                  ))}
                </ul>
              </div>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Birthdate</span>
              </div>
              <p className="border p-2 rounded w-full bg-gray-200">
                {birthdate}
              </p>
            </label>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2">
            <button
              onClick={handleSubmit}
              className="btn btn-success text-white w-full"
            >
              Update
            </button>
          </div>

          <div className="col-span-2 md:col-span-1 space-y-2">
            <button
              onClick={handleCancel}
              className="btn btn-error text-white w-full"
            >
              Cancel
            </button>
          </div>

          <div className="col-span-2 space-y-2">
            <button
              onClick={handleDelete}
              className="btn btn-warning text-white w-full"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountManagementForm;
