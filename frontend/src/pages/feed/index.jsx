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
      <div className="flex">
        <div className={`w-fit ${user.setup_finished ? 'm-2' : ''}`}>
          <NavBar user={user} />
        </div>
        <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
        <div className={`m-4 w-full justify-center items-center ${user.setup_finished ? 'flex' : 'hidden'}`}>
          Content
        </div>
      </div>
    </>
  );
};

export default index;
