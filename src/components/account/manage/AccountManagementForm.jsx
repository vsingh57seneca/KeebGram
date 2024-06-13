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
import { DEBUG, API_URL } from "../../../../config";

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
        `${API_URL[DEBUG]}/images/avatar_${user.account_id}.jpg`
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

    toast.success(response.data);

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
      <h1 className="font-semibold mb-10">Account Details</h1>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex gap-x-4 items-center m-2 col-span-full">
          <img
            src={displayImage}
            className="w-16 h-16 rounded-full object-cover"
          />
          <AvatarUpload
            user={user}
            setDisplayImage={setDisplayImage}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
        <div className="flex flex-col col-span-full">
          <div className="font-bold">{firstName + " " + lastName}</div>
          <div className="">{email}</div>
        </div>
        <div className="flex items-center">
          <h1>Display Name</h1>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <div className="flex items-center">
          <h1>Gender</h1>
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
            className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-fit z-10"
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
        <div className="flex items-center">
          <h1>Birthdate</h1>
        </div>
        <p className="border p-2 rounded w-full bg-gray-200">{birthdate}</p>
        <div className="flex items-center">
          <h1>Country</h1>
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
            className="dropdown-content p-2 shadow w-full rounded-box bg-white overflow-y-auto h-[150px] z-10"
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
        <div className="flex items-center">
          <h1>Language</h1>
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
        <div className="flex items-center">
          <h1>Account Type</h1>
        </div>
        <div className="flex flex-col">
          <div className=""> {user?.is_vendor ? "Vendor" : "Basic"}</div>
          <div className="">{!user?.is_vendor && <>
            <button onClick={() => router.push('/account/apply')} className="btn btn-xs text-white btn-info">Apply for vendor</button>
          </>}</div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <div className="col-span-2 space-y-2">
          <button
            onClick={handleDelete}
            className="btn btn-xs btn-error text-white w-full"
          >
            Delete Account
          </button>
        </div>
        <div className="flex gap-x-4">
          <div className="col-span-2 md:col-span-1 space-y-2">
            <button
              onClick={handleCancel}
              className="btn btn-xs  text-white w-full"
            >
              Cancel
            </button>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-2">
            <button
              onClick={handleSubmit}
              className="btn btn-xs btn-success text-white w-full"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountManagementForm;
