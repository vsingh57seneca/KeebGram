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

const AccountManagementForm = ({ user, setUser }) => {
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
      setDisplayImage(`${API_URL[0]}/images/avatar_${user.account_id}.jpg`);
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

    console.log(response)

    if (response.status === 200) {
      response = await Account.getOne(user?.email);
      setUser(response);
      toast.success("Account updated successfully!");
    } else if (response?.response?.status === 403){
      toast.error(response?.response?.data)
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
    <div className="h-full">
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 p-4">
        <h1 className="font-bold col-span-full">Account Management</h1>

        <div className="flex flex-col gap-y-6 gap-x-4 items-center justify-between col-span-full">
          <div className="border rounded-lg p-4 w-full flex items-center justify-between">
            <div className="flex gap-x-4 items-center">
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
            <p className="font-bold">{user?.display_name}</p>
            <p className="font-bold">{user?.email}</p>
          </div>

          <div className="border rounded-lg p-4 w-full flex items-center justify-between">
            <div className="grid grid-cols-2 w-full gap-4">
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Display Name</h1>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-sm w-full bg-white border-black"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Language</h1>
                </div>
                <div className="dropdown w-full">
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
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Birthdate</h1>
                </div>
                <p className="border p-1 rounded-lg w-full bg-gray-200 select-none">
                  {birthdate}
                </p>
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Country</h1>
                </div>
                <div className="dropdown w-full">
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
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Gender</h1>
                </div>
                <div className="dropdown w-full">
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
              </div>
              <div className="col-span-1">
                <div className="flex items-center">
                  <h1 className="font-semibold">Account Type</h1>
                </div>
                <div className="flex justify-between border border-black py-0.5 px-2 rounded-lg">
                  <div className="select-none">
                    {user?.is_vendor ? "Vendor" : "Basic"}
                  </div>
                  <div className="">
                    {!user?.is_vendor && (
                      <button
                        className="btn btn-info text-white btn-xs"
                        onClick={() => router.push("/account/apply")}
                      >
                        Become a vendor
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2 w-full flex">
                <div className="w-full flex gap-x-4">
                  <button
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-sm bg-white text-black hover:bg-gray-400 border"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                <button
                  className="btn btn-sm bg-red-700 text-white hover:bg-red-900 border-none"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementForm;
