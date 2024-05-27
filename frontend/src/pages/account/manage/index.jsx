import AccountManagementForm from "@/components/account/manage/AccountManagementForm";
import NavBar from "@/components/navigation/NavBar";
import React, { useEffect, useState } from "react";

const index = () => {
  const [user, setUser] = useState(null);
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
      <div className="flex w-full">
        <div className="w-fit m-2">
          <NavBar user={user} />
        </div>
        <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
        <div className="m-4 w-full flex">
          <AccountManagementForm user={user}/>
        </div>
      </div>
    </>
  );
};

export default index;
