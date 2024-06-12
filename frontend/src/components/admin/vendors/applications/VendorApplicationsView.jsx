import React, { useState, useEffect } from "react";
import Vendors from "@/functions/Vendors";
import Accounts from "@/functions/Accounts";
import toast from "react-hot-toast";

const VendorApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});

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

  useEffect(() => {
    console.log(accountDetails);
  }, [accountDetails]);

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

    console.log(results);

    if (results?.status === 200) {
      toast.success(results?.data);
    } else if (results?.response?.status === 404) {
      toast.error(results?.response?.data);
    }

    fetchApplications();
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Account</th>
            <th>Company</th>
            <th>Approve</th>
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
                    onClick={() => handleApprove(application?.application_id)}
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
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default VendorApplicationsView;
