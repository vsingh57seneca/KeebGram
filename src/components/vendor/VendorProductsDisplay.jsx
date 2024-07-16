import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Vendors from "../../functions/Vendors.js";
import Products from "../../functions/Products.js";
import AddProductForm from "./products/AddProductForm.jsx";

const VendorProductsDisplay = ({ user }) => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    useEffect(() => {
      if (user) {
        (async () => {
          console.log("(AccMangForm)user:", user.account_id);
          const vendor = await Vendors.getVendorByAccountId(user.account_id);
          const vendorId = vendor?.vendor_id;
          console.log("(AccMangForm)vend ID found:", vendorId);
          if (vendorId) {
            fetchProducts(vendorId);
          } else {
            console.error("Vendor not found for account ID:", user.account_id);
          }
        })();
      }
    }, [user]);

    const fetchProducts = async (vendorId) => {
        console.log("Fetching products for vendor ID:", vendorId); // Debugging
        const response = await Products.getProductsByVendorId(vendorId);
        console.log("(accMangeForm)Response from fetchProducts:", response); // Debugging
    
        if (response) {
          setProducts(response);
          setProductCount(response.length);
        } else {
          console.error("No products found for vendor ID:", vendorId); // Debugging
        }
      };

      const handleProductClick = (productId) => {
        console.log("--------start to get prod details--------");
        console.log("(AccMangForm) the prod ID clicked:", productId);
        router.push(`/product/${productId}`);
      };

      const handleProductAdded = async () => {
        setShowAddProductModal(false);
        if (user && user.is_vendor) {
          const vendor = await Vendors.getVendorByAccountId(user.account_id);
          const vendorId = vendor.vendor_id;
          if (vendorId) {
            await fetchProducts(vendorId);
          }
        }
      };

  return (
        <div className="flex flex-col justify-start mt-4">
          <h1 className="font-semibold">Products ({productCount})</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.product_id}
                  onClick={() => handleProductClick(product.product_id)}
                  className="card bg-gray-100 p-4 rounded shadow-md w-40 cursor-pointer"
                >
                  <div className="mt-2">
                    <div className="font-bold text-xs">{product.name}</div>
                    <div className="text-xs text-gray-600">
                      Units Remaining: {product.unit_count}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for this vendor.</div>
            )}
          </div>
          <div className="mt-4">
              <button
                className="btn btn-sm"
                onClick={() => setShowAddProductModal(true)}
              >
                Add New Product
              </button>
            {showAddProductModal && (
              <AddProductForm
                showModal={showAddProductModal}
                setShowModal={setShowAddProductModal}
                onClose={() => setShowAddProductModal(false)}
                user={user}
                onProductAdded={handleProductAdded} // Pass the callback
              />
            )}
          </div>
        </div>
  );
};

export default VendorProductsDisplay;
