import React, { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
const AddressAutofill = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill),
  { ssr: false }
);

import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store";
import Vendors from '@/functions/Vendors';
import toast from "react-hot-toast";

const VendorApplicationForm = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [storeURL, setStoreURL] = useState("");
  const [address, setAddress] = useState({
    address_line: "",
    address_level2: "",
    address_level1: "",
    postcode: "",
    country: "",
  });
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formRef = useRef(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  const handleRetrieve = useCallback(
    (res) => {
      const results = res.features[0].properties;
      setAddress({
        address_line: results.address_line1,
        address_level2: results.address_level2,
        address_level1: results.address_level1,
        postcode: results.postcode,
        country: results.country,
      });
    },
    [setAddress]
  );

  useEffect(() => {
    if (address?.address_line == "") {
      setAddress({
        address_level2: "",
        address_level1: "",
        postcode: "",
        country: "",
      });
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user)
    const vendor = {
      account_id: user?.account_id,
      vendor_name: companyName,
      store_url: storeURL,
      address_line: address?.address_line,
      city: address?.address_level2,
      stprov: address?.address_level1,
      postal: address?.postcode,
      phone_number: phone
    }

    const results = await Vendors.create(vendor);


    console.log(results);

    if(results?.response?.status === 500) {
      toast.error(results?.response?.data)
    } else if (results?.status === 201) {
      toast.success(results?.data)
    }
  };

  const handleCancel = () => {
    router.push("/account/manage");
  };

  return (
    <>
      <h1 className="font-bold mb-10">Apply to be a vendor</h1>
      <div className="flex flex-col gap-y-4">
        <form ref={formRef} className="flex flex-col" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4">
            <div className="col-span-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Company Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input bg-white w-full border border-black"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </label>
            </div>
            <div className="col-span-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Address</span>
                </div>
                {isClient && window && (
                  <AddressAutofill
                    accessToken={token}
                    onRetrieve={handleRetrieve}
                  >
                    <input
                      className="input bg-white w-full border border-black"
                      placeholder="Start typing your address, e.g. 123 Main..."
                      autoComplete="address-line1"
                      id="mapbox-autofill"
                      value={address?.address_line}
                      onChange={(e) =>
                        setAddress((prev) => ({
                          ...prev,
                          address_line: e.target.value,
                        }))
                      }
                    />
                  </AddressAutofill>
                )}
              </label>
            </div>
          </div>
        </form>
        {address?.address_line && (
          <div className="flex col-span-1 justify-between">
            <>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">City</span>
                </div>
                <p>{address?.address_level2}</p>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">St/Prov.</span>
                </div>
                <p>{address?.address_level1}</p>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Postal</span>
                </div>
                <p>{address?.postcode}</p>
              </label>
            </>
          </div>
        )}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="tel"
            placeholder="Type here"
            className="input bg-white w-full border border-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Store URL</span>
          </div>
          <input
            type="url"
            placeholder="Type here"
            className="input bg-white w-full border border-black"
            value={storeURL}
            onChange={(e) => setStoreURL(e.target.value)}
          />
        </label>

        <div className="flex gap-x-4 justify-end">
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
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorApplicationForm;
