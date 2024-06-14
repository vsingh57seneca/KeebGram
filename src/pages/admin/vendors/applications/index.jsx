import React, { useState, useEffect } from "react";
import Account from "@/functions/Accounts.js";
import VendorApplicationsView from "@/components/admin/vendors/applications/VendorApplicationsView";
import { useAtom } from "jotai";
import { userAtom } from "../../../../../store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const index = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  useEffect(() => {
    if(user && !user?.is_admin) {
      toast.error("Unauthorized")
      router.push('/feed')
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
