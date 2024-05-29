import React, {useState, useEffect} from "react";
import { MdAccountCircle } from "react-icons/md";

const AccountManagementForm = ({ user }) => {

  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (user?.birthdate) {
      setBirthdate(user.birthdate.slice(0, 10));
    }

    console.log(birthdate)
  }, [user]);
  
  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex items-center p-2 gap-x-4 rounded-lg">
        <h1 className="font-semibold">Account Details</h1>
      </div>
      <div className="w-full border flex items-center p-2 gap-x-4 rounded-lg">
        <MdAccountCircle size={50} />
        <button className="border-2 px-1 py-0.5 rounded-lg w-24 border-blue-400 text-blue-400">
          Upload
        </button>
        <button className="border-2 px-1 py-0.5 rounded-lg w-24 border-gray-200">
          Remove
        </button>
      </div>

      <form className="w-full border grid grid-cols-2 items-center p-4 gap-x-4 gap-y-2 rounded-lg">
        <label htmlFor="name" className="w-full col-span-1">
          <h1 className="font-semibold">Name</h1>
          <input defaultValue={user?.first_name + " " + user?.last_name} disabled={true} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="language" className="w-full col-span-1">
          <h1 className="font-semibold">Language</h1>
          <input defaultValue={user?.language} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="display-name" className="w-full col-span-1">
          <h1 className="font-semibold">Display Name</h1>
          <input defaultValue={user?.display_name} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="country" className="w-full col-span-1">
          <h1 className="font-semibold">Country</h1>
          <input defaultValue={user?.country} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="email" className="w-full col-span-2">
          <h1 className="font-semibold">Email</h1>
          <input defaultValue={user?.email} disabled={true} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="gender" className="w-full col-span-1">
          <h1 className="font-semibold">Gender</h1>
          <input defaultValue={user?.gender} type="text" className="border rounded-lg w-full px-1 py-1" />
        </label>
        <label htmlFor="birthdate" className="w-full col-span-1">
          <h1 className="font-semibold">Birthdate</h1>
          <input defaultValue={birthdate} disabled={true} type="date" className="border rounded-lg w-full px-1 py-1" />
        </label>
      </form>

      <div className="flex w-full justify-between px-4 text-sm">
        <div className="flex gap-x-2">
            <button className="border-2 px-3 py-1 rounded-lg bg-blue-500 text-white">Save Changes</button>
            <button className="border-2 px-3 py-1 rounded-lg">Cancel</button>
        </div>
        <button className="border-2 px-3 py-1 rounded-lg bg-red-700 text-white">Delete Account</button>
      </div>
    </div>
  );
};

export default AccountManagementForm;
