import React from "react";

const VendorProductsDisplay = ({ products, storeUrl }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Vendor Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.product_id} className="p-4 bg-white rounded-lg shadow-sm">
            <img
              src={product.image_data || "/placeholder-image.png"} // Assuming product has image_data
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-gray-800">${product.price}</p>
            {storeUrl && (
              <button
                onClick={() => window.open(storeUrl, "_blank")} // Use storeUrl from prop
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View in store
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProductsDisplay;
