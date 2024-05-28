import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { useRouter } from "next/navigation";

const UpwardDowndrop = ({ morePanelOpen }) => {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/')
  }
  
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
        <li onClick={handleLogout} className="p-4 flex items-center hover:bg-gray-200 transition-all duration-300 ease-in-out rounded">
          <MdLogout className="mr-4" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UpwardDowndrop;
