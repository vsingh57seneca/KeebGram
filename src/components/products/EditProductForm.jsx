import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const EditProductForm = ({ onClose, fetchProducts, product }) => {
  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDescription, setProductDescription] = useState(
    product.description
  );
  const [unitCount, setUnitCount] = useState(product.unit_count);
  const [vendorId, setVendorId] = useState(product.vendor_id);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(product.image_url);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
  };

  const handleEditProduct = async () => {
    if (!product.product_id) {
      toast.error("Product ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("unit_count", unitCount);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/products/${product.product_id}/updateProductWithImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product updated successfully");
        fetchProducts(product.product_id); // Refresh the product details
        onClose(); // Close the modal
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred: Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Edit Product</h2>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Product Price</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Product Description</label>
          <textarea
            className="textarea textarea-bordered w-full bg-gray-100"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Unit Count</label>
          <input
            type="number"
            className="input input-bordered w-full bg-gray-100"
            value={unitCount}
            onChange={(e) => setUnitCount(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <input type="file" onChange={handleFileChange} />
          {imageURL && (
            <img
              src={imageURL}
              alt="Product Preview"
              className="mt-2 w-1/4 rounded border-2"
            />
          )}
        </div> */}
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleEditProduct}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
