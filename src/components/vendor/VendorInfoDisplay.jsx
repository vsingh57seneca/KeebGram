import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Vendors from "../../functions/Vendors.js";
import Address from "../../functions/Addresses.js";

const VendorInfoDisplay = ({ user }) => {
    const router = useRouter();
    const [vendorName, setVendorName] = useState("");
    const [storeURL, setStoreURL] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressLine, setAddressLine] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressPostal, setAddressPostal] = useState("");

    useEffect(() => {
      if (user) {
        (async () => {
          console.log("(AccMangForm)user:", user.account_id);
          const vendor = await Vendors.getVendorByAccountId(user.account_id);
          const address = await Address.getAddressByAccountId(user.account_id);
          if (vendor && address) {
            //set vendor info
            setVendorName(vendor.vendor_name);
            setStoreURL(vendor.store_url);
            setPhoneNumber(vendor.phone_number);
            //set address info
            setAddressLine(address.address_line);
            setAddressCity(address.city);
            setAddressState(address.stprov);
            setAddressPostal(address.postal);
          } else {
            console.error("Vendor or Vendor Address not found for account ID:", user.account_id);
          }
        })();
      }
    }, [user]);

    const handleCancel = () => {
        router.push("/feed");
      };

    const handleSubmit = async () => {
        let response = await Address.update({
            account_id: user.account_id,
            address_line: addressLine,
            city: addressCity,
            stprov: addressState,
            postal: addressPostal,
        });

        console.log(response);

        toast.success(response.data);
    };

  return (
    <>
    <h1 className="font-semibold mb-10">Vendor Details</h1>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex items-center">
          <h1>Vendor Name</h1>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex items-center">
          <h1>Store URL</h1>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={storeURL}
          onChange={(e) => setStoreURL(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex items-center">
          <h1>Phone Number</h1>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-y-4">
        <div className="flex items-center">
          <h1>Address</h1>
        </div>
        <div>
        <h3>Address Line</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
        />
        <h3>City</h3>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
        />
        <h3>State/Province</h3>
          <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={addressState}
          onChange={(e) => setAddressState(e.target.value)}
        />
           <h3>Postal Code</h3>
          <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full bg-white border-black"
          value={addressPostal}
          onChange={(e) => setAddressPostal(e.target.value)}
        />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-sm bg-gray-300 hover:bg-gray-400"
          onClick={handleCancel}
        >
          Cancel
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

export default VendorInfoDisplay;
