import AccountManagementForm from "@/components/account/manage/AccountManagementForm";
import NavBar from "@/components/navigation/NavBar";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userAtom } from "../../../../store";

const index = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <>
      <AccountManagementForm user={user} />
    </>
  );
};

export default index;
