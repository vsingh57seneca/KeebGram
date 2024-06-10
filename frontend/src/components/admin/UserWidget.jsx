import React, { useEffect, useState } from "react";
import Accounts from "@/functions/Accounts";
import { FaExternalLinkAlt } from "react-icons/fa";

const UserWidget = () => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      let users = await Accounts.getAll();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="stats shadow w-full bg-white text-black">
      <div className="stat">
        <div className="stat-title">Users</div>
        <div className="stat-value">{users?.length}</div>
        <div className="flex justify-between">
          <div className="stat-desc">Total accounts</div>
          <div className="flex gap-x-2 items-center cursor-pointer">
            <div className="stat-desc">Users</div>
            <FaExternalLinkAlt size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
