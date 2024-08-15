import React, { useEffect, useState } from "react";
import Vendors from '@/functions/Vendors';

const ProductsDisplay = ({ products, design }) => {
  const [vendorProducts, setVendorProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchVendorProducts = async () => {
    const results = await Vendors.fetchVendorProductByColors(design);
    
    if(results?.length > 0) {
      setVendorProducts(results);
    } else {
      setVendorProducts([])
    }
  }

  useEffect(() => {
    fetchVendorProducts();
  }, [design]);

  useEffect(() => {
    // Combine vendorProducts and products, with vendorProducts at the start
    setAllProducts([...vendorProducts, ...products]);
  }, [vendorProducts, products]);

  useEffect(() => {
    console.log(allProducts)
  }, [allProducts])

  return (
    <div className="p-4">
      <h1 className="font-bold">Available Products</h1>
      {allProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 p-0 max-h-[90vh] overflow-hidden overflow-y-auto no-scrollbar m-12">
          {allProducts.map((product, index) => (
            <div className="col-span-1 space-y-2" key={index}>
              <div className="relative">
                <img src={product?.image || product?.image_data} alt={product?.title} />
                <div className="absolute bottom-0 right-0 m-2 px-2 py-1 rounded bg-black/70 text-white">
                  {product?.cost || product?.price}
                </div>
              </div>
              <h1 className="font-semibold text-xl">{product?.title || product?.name}</h1>
              <button
                onClick={() => window.open(product?.url | product?.store_link, "_blank")}
                className="btn btn-primary btn-sm text-white"
              >
                View from Vendor
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>No Products Available With Current Selection</div>
      )}
    </div>
  );
};

export default ProductsDisplay;
