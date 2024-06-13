import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { useRouter } from "next/navigation";

const NavBarMoreMenu = ({ morePanelOpen }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div
      className={`border bg-white rounded p-2 absolute -mt-[550%] -ml-[400%] md:-mt-[450%] md:-ml-0`}
    >
      <ul>
        <li className="p-4 flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out rounded">
          <MdSettings className="mr-4" />
          Settings
        </li>
        <label onClick={handleLogout} htmlFor="">
          <li
            
            className="p-4 flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out rounded"
          >
            <MdLogout className="mr-4" />
            Logout
          </li>
        </label>
      </ul>
    </div>
  );
};

export default NavBarMoreMenu;
