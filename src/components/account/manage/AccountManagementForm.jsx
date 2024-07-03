import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import countryList from "../../data/country_list.json";
import genderList from "../../data/gender_list.json";
import languageList from "../../data/language_list.json";
import Account from "../../../functions/Accounts.js";
import Vendors from "../../../functions/Vendors.js";
import Products from "../../../functions/Products.js";
import AvatarUpload from "@/components/global_components/AvatarUpload";
import { useAtom } from "jotai";
import { displayImageAtom } from "../../../../store";
import { DEBUG, API_URL } from "../../../../config";
import AddProductForm from "../../products/AddProductForm";

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
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

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
      setDisplayImage(`${API_URL[DEBUG]}/images/avatar_${user.account_id}.jpg`);

      if (user.is_vendor) {
        (async () => {
          console.log("(AccMangForm)user:", user.account_id);
          const vendor = await Vendors.getVendorByAccountId(user.account_id);
          const vendorId = vendor?.vendor_id;
          console.log("(AccMangForm)vend ID found:", vendorId);
          if (vendorId) {
            fetchProducts(vendorId);
          } else {
            console.error("Vendor not found for account ID:", user.account_id);
          }
        })();
      }
    }
  }, [user]);

  const fetchProducts = async (vendorId) => {
    console.log("Fetching products for vendor ID:", vendorId); // Debugging
    const response = await Products.getProductsByVendorId(vendorId);
    console.log("(accMangeForm)Response from fetchProducts:", response); // Debugging

    if (response) {
      setProducts(response);
    } else {
      console.error("No products found for vendor ID:", vendorId); // Debugging
    }
  };

  const handleProductClick = (productId) => {
    console.log("--------start to get prod details--------");
    console.log("(AccMangForm) the prod ID clicked:", productId);
    router.push(`/product/${productId}`);
  };

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

  const handleProductAdded = async () => {
    setShowAddProductModal(false);
    if (user && user.is_vendor) {
      const vendor = await Vendors.getVendorByAccountId(user.account_id);
      const vendorId = vendor.vendor_id;
      if (vendorId) {
        await fetchProducts(vendorId);
      }
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
          <div className="">
            {!user?.is_vendor && (
              <button
                className="btn btn-sm"
                onClick={() => router.push("/account/apply")}
              >
                Become a vendor
              </button>
            )}
          </div>
        </div>
      </div>
      {user?.is_vendor > 0 && (
        <div className="flex flex-col justify-start mt-4">
          <h1 className="font-semibold">Products</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.product_id}
                  onClick={() => handleProductClick(product.product_id)}
                  className="card bg-gray-100 p-4 rounded shadow-md w-40 cursor-pointer"
                >
                  <div className="mt-2">
                    <div className="font-bold text-xs">{product.name}</div>
                    <div className="text-xs text-gray-600">
                      Units Remaining: {product.unit_count}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for this vendor.</div>
            )}
          </div>
          <div className="mt-4">
            {user?.is_vendor && (
              <button
                className="btn btn-sm"
                onClick={() => setShowAddProductModal(true)}
              >
                Add New Product
              </button>
            )}
            {showAddProductModal && (
              <AddProductForm
                showModal={showAddProductModal}
                setShowModal={setShowAddProductModal}
                onClose={() => setShowAddProductModal(false)}
                user={user}
                onProductAdded={handleProductAdded} // Pass the callback
              />
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-sm bg-gray-300 hover:bg-gray-400"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete Account
        </button>
        <button
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AccountManagementForm;
