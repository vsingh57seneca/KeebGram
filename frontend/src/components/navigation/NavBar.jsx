import {
  IoMdHome,
  IoMdSearch,
  IoMdNotifications,
  IoMdMenu,
} from "react-icons/io";
import {
  MdContentCopy,
  MdMessage,
  MdCreateNewFolder,
  MdAccountBox,
  MdKeyboard,
} from "react-icons/md";
import NavbarMoreUpwardDowndrop from "@/components/navigation/NavbarMoreUpwardDowndrop";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import FinishSetup from "../FinishSetup";

const NavBar = ({ user }) => {
  const [morePanelOpen, setMorePanelOpen] = useState(false);
  const morePanelRef = useRef(null);
  const router = useRouter();

  const handleClickOutside = (e) => {
    if (morePanelRef.current && !morePanelRef.current.contains(e.target)) {
      setMorePanelOpen(false);
    }
  };

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {user.setup_finished ? (
        <>
          <ul className="md:flex flex-col justify-between h-full w-full hidden select-none">
            <label className="flex items-center justify-center">
              {/* <MdKeyboard className="flex justify-center"/>
               */}
              <Image
                className=""
                src="/images/logo/Logo_Light.jpg"
                alt=""
                width={25}
                height={25}
                priority={true}
              />
              <li className="ml-4 text-xl italic font-semibold cursor-pointer hidden lg:block">
                KeebGram
              </li>
            </label>
            <ul className="p-4 space-y-2 text-md">
              <li
                onClick={() => router.push("/feed")}
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
              >
                <IoMdHome className="lg:mr-4" />
                <label className="lg:block hidden">Home</label>
              </li>
              {/* <li className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit">
        <IoMdSearch className="lg:mr-4" />
        <label className="lg:block hidden">Search</label>
      </li> */}
              {/* <li className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit">
        <MdMessage className="lg:mr-4" />
        <label className="lg:block hidden">Messages</label>
      </li> */}
              {/* <li className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit">
        <IoMdNotifications className="lg:mr-4" />
        <label className="lg:block hidden">Notifications</label>
      </li> */}
              <li className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit">
                <MdCreateNewFolder className="lg:mr-4" />
                <label className="lg:block hidden">Create</label>
              </li>
            </ul>
            <ul className="p-4 space-y-2 text-md">
              <li
                onClick={() => router.push("/account/manage")}
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
              >
                <MdAccountBox className="lg:mr-4" />
                <label className="lg:block hidden">
                  {user?.display_name ? user.display_name : "Profile"}
                </label>
              </li>
              <li
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
                onClick={(e) => setMorePanelOpen(!morePanelOpen)}
                ref={morePanelRef}
              >
                <IoMdMenu className="lg:mr-4" />
                <label className="lg:block hidden">More</label>
                <NavbarMoreUpwardDowndrop morePanelOpen={morePanelOpen} />
              </li>
            </ul>
          </ul>
        </>
      ) : (
        <>
        <div className="absolute w-full flex h-full justify-center items-center z-20 bg-black/70">
          <FinishSetup user={user} />
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;
