import React from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const SidebarComponent = () => {
  const { sidebarContent } = useSidebar();

  return (
    <div className="">
      {/* <h2>SidebarComponent</h2> */}
      <div>{sidebarContent}</div>
    </div>
  );
};

export default SidebarComponent;
