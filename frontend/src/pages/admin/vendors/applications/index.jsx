import React, { useState, useEffect } from "react";
import NavBar from "@/components/navigation/NavBar";
import Account from "@/functions/Accounts.js";
import AdminDisplay from "@/components/admin/AdminDisplay";
import VendorApplicationsView from "@/components/admin/vendors/applications/VendorApplicationsView";

const index = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser && storedUser.email) {
      Account.getOne(storedUser.email);
    }
  }, []);

  return (
    <div className="h-full p-4">
      <h1 className="font-bold col-span-full">Vendor Applications</h1>
      <VendorApplicationsView/>
    </div>
  );
};

export default index;
