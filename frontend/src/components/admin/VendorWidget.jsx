import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const VendorWidget = () => {
  return (
    <div className="stats shadow w-full bg-white text-black">
      <div className="stat">
        <div className="stat-title">Vendor Applications</div>
        <div className="stat-value">0</div>
        <div className="flex justify-between">
          <div className="stat-desc">Awaiting approval</div>
          <div className="flex gap-x-2 items-center cursor-pointer">
            <div className="stat-desc">Applications</div>
            <FaExternalLinkAlt size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorWidget;
