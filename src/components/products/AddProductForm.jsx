import React, { useState, useEffect } from "react";
import Account from "../../functions/Accounts";
import toast from "react-hot-toast";
import axios from "axios";

const AddProductForm = ({ onClose, fetchProducts }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitCount, setUnitCount] = useState("");
  const [vendorId, setVendorId] = useState(null);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fetchVendorId = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.account_id) {
        try {
          const vendorData = await Account.getVendorByAccountId(
            user.account_id
          );
          if (vendorData && vendorData.vendor_id) {
            setVendorId(vendorData.vendor_id);
          } else {
            toast.error("Vendor ID not found");
          }
        } catch (error) {
          console.error("Error fetching vendor ID:", error);
          toast.error("Error fetching vendor ID");
        }
      } else {
        toast.error("User not found");
      }
    };

    fetchVendorId();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
  };

  const handleAddProduct = async () => {
    if (!vendorId) {
      toast.error("Vendor ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("unit_count", unitCount);
    formData.append("vendor_id", vendorId);
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/products/createProductWithImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product added successfully");
        fetchProducts(); // Refresh the product list
        setFile(null);
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setUnitCount("");
        onClose(); // Close the modal
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred: Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Add Product</h2>
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
        <div className="mb-4">
          <label className="block mb-2">Upload Image</label>
          <input type="file" onChange={handleFileChange} />
          {imageURL && (
            <img
              src={imageURL}
              alt="Product Preview"
              className="mt-2 w-1/4 rounded border-2"
            />
          )}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-secondary mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
