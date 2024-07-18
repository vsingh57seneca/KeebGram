import React from "react";

const ProductsDisplay = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-2 max-h-[90vh] overflow-hidden overflow-y-auto no-scrollbar m-12">
    {products &&
      products.map((product, index) => {
        return (
          <>
            <div className="col-span-1 space-y-2">
              <div className="relative">
                <img src={product?.image} />
                <div className="absolute bottom-0 right-0 m-2 px-2 py-1 rounded bg-black/70 text-white">
                  {product?.cost}
                </div>
              </div>
              <h1 className="font-semibold text-xl">{product?.title}</h1>
              <button onClick={() => window.open(product?.url, '_blank')} className="btn btn-primary btn-sm text-white">View from Vendor</button>
            </div>
          </>
        );
      })}
  </div>
  );
};

export default ProductsDisplay;
