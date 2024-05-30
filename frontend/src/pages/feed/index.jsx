import ContentDisplay from "@/components/content/ContentDisplay";
import NavBar from "@/components/navigation/NavBar";
import React, { useEffect, useState } from "react";

const index = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <div className="flex">
        <div className={`w-fit lg:m-2`}>
          <NavBar user={user} />
        </div>
        <div className="w-px min-h-screen bg-gradient-to-b from-white via-gray-700 to-white hidden md:block"></div>
        <div className={`m-4 w-full justify-center items-center flex`}>
          <ContentDisplay />
        </div>
      </div>
    </>
  );
};

export default index;
