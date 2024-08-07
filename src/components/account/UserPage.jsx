import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Accounts from "../../functions/Accounts";
import Designs from "../../functions/Designs";
import Vendors from "../../functions/Vendors";
import Products from "../../functions/Products"; 
import { API_URL } from "../../../config";
import DesignPreview from "../editor/DesignPreview";
import Modal from "./UserDesignModal";
import VendorProductsDisplay from "../vendor/products/VendorProductsDisplay"; 
import { useSidebar } from "@/contexts/SidebarContext"; 

const UserPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const [user, setUser] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendor, setVendor] = useState(null); 
  const [loading, setLoading] = useState(true);

  const { setSidebarContent } = useSidebar(); 

  useEffect(() => {
    if (username) {
      fetchUserData();
    }
  }, [username]);

  const fetchUserData = async () => {
    try {
      console.log("this is the username:" + username);
      const userData = await Accounts.getOneByUsername(username);

      if (userData) {
        setUser(userData);
        const userDesigns = await Designs.getDesignsByUserId(userData.account_id);
        setDesigns(userDesigns || []);

        const vendorData = await Vendors.getVendorByAccountId(userData.account_id);

        if (vendorData) {
          setVendor(vendorData); 
          const products = await Products.getProductsByVendorId(vendorData.vendor_id);
          setVendorProducts(products || []);
          setSidebarContent(<VendorProductsDisplay products={products} storeUrl={vendorData.store_url} />); 
        }
      } else {
        console.log("user not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDesignClick = (design) => {
    setSelectedDesign(design); 
  };

  const handleCloseModal = () => {
    setSelectedDesign(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User {username} not found</div>;
  }

  return (
    <div className="p-4 flex flex-col md:flex-row">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center bg-gray-200 p-4 rounded-lg">
          <img
            src={`${API_URL[0]}/images/avatar_${user.account_id}.jpg`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
          <h1 className="ml-4 text-2xl font-semibold">{user.display_name}</h1>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">
            Designs created by <em>{user.display_name}</em>
          </h2>
          <ul className="mt-4 space-y-4">
            {designs.length > 0 ? (
              designs.map((design) => (
                <li key={design.design_id} className="p-4 border border-gray-300 rounded-lg">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleDesignClick(design)} 
                  >
                    <strong>"{design.design_name}"</strong> - <strong>Created on: {new Date(design.created_at).toLocaleDateString()}</strong>
                  </button>
                  <DesignPreview design={design} />
                </li>
              ))
            ) : (
              <li>No designs available.</li>
            )}
          </ul>
        </div>

        {selectedDesign && (
          <Modal onClose={handleCloseModal}>
            <DesignPreview design={selectedDesign} />
            <div className="mt-4">
              <p><strong>Created At:</strong> {new Date(selectedDesign.created_at).toLocaleString()}</p>
              <p><strong>Alpha Color:</strong> {selectedDesign.alphas_color}</p>
              <p><strong>Modifier Color:</strong> {selectedDesign.modifiers_color}</p>
              <p><strong>Accent Color:</strong> {selectedDesign.accents_color}</p>
              <p><strong>Legend Color:</strong> {selectedDesign.legends_color}</p>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button className="bg-red-500 text-white p-2 rounded" onClick={handleCloseModal}>
                Close
              </button>
              <button className="bg-green-500 text-white p-2 rounded" onClick={() => console.log('Share clicked')}>
                Share
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default UserPage;
