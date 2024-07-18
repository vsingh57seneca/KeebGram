import React, { useState, useEffect } from "react";
import VendorInfoDisplay from "@/components/vendor/VendorInfoDisplay";
import VendorProductsDisplay from "@/components/vendor/VendorProductsDisplay";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSidebar } from "@/contexts/SidebarContext";

const index = () => {
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { setSidebarContent } = useSidebar();

  useEffect(() => {
    setSidebarContent(<div></div>);
    return () => setSidebarContent(null); // Cleanup sidebar content on unmount
  }, [setSidebarContent]);

  useEffect(() => {
    if(user && !user?.is_vendor) {
      toast.error("Unauthorized")
      router.push('/feed')
    }
  }, []);

  return (
    <>
    <div className="h-full">
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 p-4">
        <h1 className="font-bold col-span-full">Dashboard</h1>
        <VendorInfoDisplay user={user}/>
        <VendorProductsDisplay user={user}/>
      </div>
    </div>
    </>
  );
};

export default index;