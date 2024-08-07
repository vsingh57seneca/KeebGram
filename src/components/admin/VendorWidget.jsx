import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Vendors from '@/functions/Vendors';
import { useRouter } from "next/router";

const VendorWidget = () => {
  const [applications, setApplications] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let vendors = await Vendors.getAll();
        setApplications(vendors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="stats shadow w-full bg-white text-black">
      <div className="stat">
        <div className="stat-title">Vendor Applications</div>
        <div className="stat-value">{applications?.length > 0 ? applications?.length : 0}</div>
        <div className="flex justify-between">
          <div className="stat-desc">Awaiting approval</div>
          <div className="flex gap-x-2 items-center cursor-pointer" onClick={() => router.push('/admin/vendors/applications')}>
            <div className="stat-desc">Applications</div>
            <FaExternalLinkAlt size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorWidget;
