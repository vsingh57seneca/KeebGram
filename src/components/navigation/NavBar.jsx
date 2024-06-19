import { IoMdHome } from "react-icons/io";
import {
  MdCreateNewFolder,
  MdAccountBox,
  MdAdminPanelSettings,
  MdFavorite,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoLogOut } from "react-icons/io5";
import CreatePostForm from "../posts/CreatePostForm";
import toast from "react-hot-toast";

const NavBar = ({ user, posts, setPosts }) => {
  const router = useRouter();

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);


  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!")
    router.push("/");
  };

  const handleCloseModal = () => {
    setShowCreatePostModal(false);
  };

  return (
    <>
      <CreatePostForm
        onClose={handleCloseModal}
        posts={posts}
        setPosts={setPosts}
        setShowModal={setShowCreatePostModal}
        showModal={showCreatePostModal}
        user={user}
      />
      <div className="md:block hidden">
        <ul className="hidden md:flex flex-col justify-between h-full w-full select-none p-2">
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
              onClick={() => setShowCreatePostModal(!showCreatePostModal)}
              className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
            >
              <MdCreateNewFolder className="lg:mr-4" />
              <label className="lg:block hidden">Create</label>
            </li>
            <li
              onClick={() => router.push("/posts/favorites")} 
              className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
            >
              <MdFavorite className="lg:mr-4" />
              <label className="lg:block hidden">Favorites</label>
            </li>
          </ul>
          <ul className="p-4 space-y-2 text-md">
            <li
              onClick={() => router.push("/admin/dashboard")}
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
            <li
              onClick={handleLogout}
              className="flex items-center px-2 py-3 hover:bg-gray-300 rounded transition-all duration-300 ease-in-out cursor-pointer lg:w-full w-fit"
            >
              <IoLogOut className="lg:mr-4" />
              <label className="lg:block hidden">
                <p>Logout</p>
              </label>
            </li>
          </ul>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="absolute bottom-0 md:hidden w-full z-10">
        <div className="flex p-4 bg-white items-center justify-around border-t border-black">
          <IoMdHome className="" onClick={() => router.push("/feed")} />
          <div className="divider divider-horizontal bg-gray-700 to-white w-px"></div>
          <MdCreateNewFolder
            className=""
            onClick={() => setShowCreatePostModal(!showCreatePostModal)}
          />
          <div className="divider divider-horizontal bg-gray-700 to-white w-px"></div>
          <Image
            className="border-0"
            src="/images/logo/Logo_Light.jpg"
            alt=""
            width={25}
            height={25}
          />
          <div className="divider divider-horizontal bg-gray-700 to-white w-px"></div>
          <MdAccountBox
            className=""
            onClick={() => router.push("/account/manage")}
          />
          <div className="divider divider-horizontal bg-gray-700 to-white w-px"></div>
          <IoLogOut onClick={handleLogout} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
