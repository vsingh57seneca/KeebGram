import { IoMdHome, IoMdMenu } from "react-icons/io";
import {
  MdCreateNewFolder,
  MdAccountBox,
  MdAdminPanelSettings,
} from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import FinishSetup from "../feed/FinishSetup";
import NavBarMoreMenu from "./NavBarMoreMenu";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <>
      {user.setup_finished ? (
        <>
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center shadow-lg z-10">
            <button
              onClick={() => router.push("/feed")}
              className="flex flex-col items-center p-2"
            >
              <IoMdHome className="text-xl" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => router.push("/create")}
              className="flex flex-col items-center p-2"
            >
              <MdCreateNewFolder className="text-xl" />
              <span className="text-xs">Create</span>
            </button>

            <button
              onClick={() => router.push("/account/manage")}
              className="flex flex-col items-center p-2"
            >
              <MdAccountBox className="text-xl" />
              <span className="text-xs">
                {user?.display_name ? user.display_name : "Profile"}
              </span>
            </button>
            <button
              onClick={() => router.push("/admin")}
              className={`flex flex-col items-center p-2 ${
                user?.is_admin ? "" : "hidden"
              }`}
            >
              <MdAdminPanelSettings className="text-xl" />
              <span className="text-xs">Admin</span>
            </button>

            {/* <label
              onClick={(e) => setMorePanelOpen(!morePanelOpen)}
              className="flex flex-col items-center p-2"
              ref={morePanelRef}
            >
              <IoMdMenu className="text-xl" />
              <span className="text-xs">
                <p>More</p>
                <div className={`${morePanelOpen ? 'flex' : 'hidden'} relative`}>
                
                </div>
              </span>
            </label> */}

            <div className="dropdown dropdown-top dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="m-1 bg-white flex flex-col items-center"
              >
                <IoMdMenu className="text-xl" />
                <span className="text-xs">
                  <p>More</p>
                  <div
                    className={`${morePanelOpen ? "flex" : "hidden"} relative`}
                  ></div>
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="hidden md:flex flex-col justify-between h-full w-full select-none">
            <label className="flex items-center justify-center">
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
              <li
                onClick={() => router.push("/create")}
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
              >
                <MdCreateNewFolder className="lg:mr-4" />
                <label className="lg:block hidden">Create</label>
              </li>
            </ul>
            <ul className="p-4 space-y-2 text-md">
              <li
                onClick={() => router.push("/admin")}
                className={`${
                  user?.is_admin ? "flex" : "hidden"
                } items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit`}
              >
                <MdAdminPanelSettings className="lg:mr-4" />
                <label className="lg:block hidden">Admin</label>
              </li>
              <li
                onClick={() => router.push("/account/manage")}
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
              >
                <MdAccountBox className="lg:mr-4" />
                <label className="lg:block hidden">
                  {user?.display_name ? user.display_name : "Profile"}
                </label>
              </li>
              {/* <li
                className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
                onClick={(e) => setMorePanelOpen(!morePanelOpen)}
                ref={morePanelRef}
              >
                <IoMdMenu className="lg:mr-4" />
                <label className="md:block hidden">
                  <p>More</p>
                  <div
                    className={`${morePanelOpen ? "flex" : "hidden"} relative`}
                  >
                    <NavBarMoreMenu morePanelOpen={morePanelOpen} />
                  </div>
                </label>
              </li> */}
              <li>
                <div className="dropdown dropdown-top flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center"
                  >
                    <IoMdMenu className="lg:mr-4" />
                    <span className="">
                      <p>More</p>
                      <div
                        className={`${
                          morePanelOpen ? "flex" : "hidden"
                        } relative`}
                      ></div>
                    </span>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52"
                  >
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
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
