import React from "react";
import UserWidget from "./UserWidget";
import VendorWidget from "./VendorWidget";
import PostsWidget from "./PostsWidget";

const AdminDisplay = () => {
  return (
    <div className="h-full">
      <div className="grid grid-cols-4 gap-y-8 gap-x-4 p-4">
        <h1 className="font-bold col-span-full">Dashboard</h1>
        <div className="col-span-full md:col-span-2 lg:col-span-1">
          <UserWidget />
        </div>
        <div className="col-span-full md:col-span-2 lg:col-span-1">
          <VendorWidget />
        </div>
        <div className="col-span-full md:col-span-2 lg:col-span-1">
          <PostsWidget />
        </div>
      </div>
    </div>
  );
};

export default AdminDisplay;
