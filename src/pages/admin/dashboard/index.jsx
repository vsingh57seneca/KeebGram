import React, { useState, useEffect } from "react";
import NavBar from "@/components/navigation/NavBar";
import Account from "@/functions/Accounts.js";
import AdminDisplay from "@/components/admin/AdminDisplay";

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
    <>
        <AdminDisplay />
    </>
  );
};

export default index;
