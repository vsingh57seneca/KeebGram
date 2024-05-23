import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";

const UpwardDowndrop = ({ morePanelOpen }) => {
  return (
    <div
      className={`absolute border rounded mb-[12%] ml-8 z-10 p-1 bg-gray-50 ${
        !morePanelOpen ? "hidden" : "block select-none"
      }`}
    >
      <ul>
        <li className="p-4 flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out rounded">
          <MdSettings className="mr-4" />
          Settings
        </li>
        <li className="p-4 flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out rounded">
          <MdLogout className="mr-4" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UpwardDowndrop;
