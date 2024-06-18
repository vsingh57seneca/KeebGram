import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Account from "../../functions/Accounts.js";
import toast from "react-hot-toast";
import EditProductForm from "./EditProductForm";

const ProductDetails = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await Account.getProductById(id);
      if (response) {
        setProduct(response);
        if (response.image_url) {
          setDisplayImage(response.image_url);
        } else {
          setDisplayImage(null);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch product details");
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      const response = await Account.deleteProduct(productId);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        router.push("/account/manage");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      {isEditing ? (
        <EditProductForm
          product={product}
          onClose={() => setIsEditing(false)}
          fetchProducts={fetchProductDetails}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-800">
              Product Details
            </h1>
            <div>
              <button onClick={handleEdit} className="btn btn-warning mr-2">
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
          <div className="mt-4">
            {/* <div className="flex items-center justify-center mb-4">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={product.name}
                  className="max-h-80 object-contain"
                />
              ) : (
                <p>No image available</p>
              )}
            </div> */}
            <h2 className="text-xl font-semibold text-gray-700">
              {product.name}
            </h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Units:</span>{" "}
                {product.unit_count}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
