import React, { useState, useEffect } from "react";
import Vendors from "@/functions/Vendors";
import Accounts from "@/functions/Accounts";
import toast from "react-hot-toast";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../store";

const VendorApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});
  const [selectedVendor, setSelectedVendor] = useState({});
  const [showVendorDetail, setShowVendorDetail] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  const fetchApplications = async () => {
    try {
      let vendors = await Vendors.getAll();
      setApplications(vendors);

      // Fetch account details for each application
      const details = await Promise.all(
        vendors.map(async (application) => {
          const account = await Accounts.getOneById(application.account_id);
          return { ...application, account };
        })
      );

      // Store account details
      const accountDetailsMap = details.reduce((acc, curr) => {
        acc[curr.account_id] = curr.account;
        return acc;
      }, {});

      setAccountDetails(accountDetailsMap);
    } catch (error) {
      console.error("Error fetching applications or account details:", error);
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);

  const onShowDetail = (application) => {
    setSelectedVendor(application);
    setShowVendorDetail(!showVendorDetail);
  };

  const handleApprove = async (application_id) => {
    console.log("Approve:", application_id);
    // Add your approval logic here

    let results = await Vendors.approve(application_id);

    console.log(results);

    if (results?.status === 200) {
      toast.success(results?.data);
    } else {
      toast.error(results?.response?.data);
    }

    fetchApplications();
  };

  const handleDecline = async (application) => {
    console.log("Decline:", application);

    let results = await Vendors.delete(application);

    if (results?.status === 200) {
      toast.success(results?.data);
    } else if (results?.response?.status === 404) {
      toast.error(results?.response?.data);
    }

    fetchApplications();
  };

  useEffect(() => {
    console.log(selectedVendor);
  }, [selectedVendor]);

  return (
    <>
      {!showVendorDetail ? (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Company</th>
                  <th>Approve</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {applications?.length > 0 ? (
                  applications.map((application, index) => (
                    <tr key={index}>
                      <td>
                        {accountDetails[application.account_id]?.display_name ||
                          "Loading..."}
                      </td>
                      <td>{application.vendor_name}</td>
                      <td className="flex flex-col gap-y-2">
                        <button
                          className="btn btn-xs btn-success text-white w-full"
                          onClick={() =>
                            handleApprove(application?.application_id)
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-error text-white w-full"
                          onClick={() => handleDecline(application)}
                        >
                          Decline
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-xs btn-info text-white"
                          onClick={() => onShowDetail(application)}
                        >
                          <IoMdInformationCircleOutline />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td colSpan="3">No applications</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th>Account</th>
                  <th>Company</th>
                  <th>Approve</th>
                  <th>Details</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 bg-black/70 w-full flex h-full justify-center items-center">
            <div className="bg-white flex flex-col gap-y-4 rounded-lg border w-1/2 p-4 items-center justify-center">
              {selectedVendor ? (
                <>
                  <h1 className="flex justify-start w-full font-bold">Application ID: {selectedVendor?.application_id}</h1>
                  <div className="flex gap-x-4">
                    <h1 className="font-bold">Username</h1>
                    <p>
                      {accountDetails[selectedVendor.account_id]?.display_name}
                    </p>
                  </div>
                  <div className="flex gap-x-4">
                    <h1 className="font-bold">Email</h1>
                    <p>
                      {accountDetails[selectedVendor.account_id]?.email}
                    </p>
                  </div>
                  <div className="flex gap-x-4">
                    <h1 className="font-bold">Vendor Name</h1>
                    <p>
                      {selectedVendor?.vendor_name}
                    </p>
                  </div>
                  <div className="flex gap-x-4">
                    <h1 className="font-bold">Phone</h1>
                    <p>
                      {selectedVendor?.phone_number}
                    </p>
                  </div>
                  <div className="flex gap-x-4">
                    <h1 className="font-bold">Store URL</h1>
                    <p>
                      {selectedVendor?.store_url}
                    </p>
                  </div>
                </>
              ) : (
                <>No vendor selected</>
              )}
              <div className="w-full flex justify-between p-4">
                {/* <button
                  className="btn btn-sm text-white bg-red-700 hover:bg-red-900 "
                  onClick={() => {
                    setSelectedVendor({});
                    setShowVendorDetail(!showVendorDetail);
                  }}
                >
                  Delete
                </button> */}
                <button
                  className="btn btn-sm text-white btn-info flex w-full"
                  onClick={() => {
                    setSelectedVendor({});
                    setShowVendorDetail(!showVendorDetail);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VendorApplicationsView;
