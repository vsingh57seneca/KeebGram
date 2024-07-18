import React, { useState, useEffect } from "react";
import AdminDisplay from "@/components/admin/AdminDisplay";
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
    if(user && !user?.is_admin) {
      toast.error("Unauthorized")
      router.push('/feed')
    }
  }, []);

  return (
    <>
        <AdminDisplay />
    </>
  );
};

export default index;
