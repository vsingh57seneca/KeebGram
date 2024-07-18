import React, { useState } from "react";
import Products from "@/functions/Products";
import Vendors from "@/functions/Vendors";
import toast from "react-hot-toast";
import fFile from "@/functions/Files";
import Colors from "../../keyboard/colors"; // Import the colors
import { DEBUG, API_URL } from "../../../../config";

const AddProductForm = ({
  showModal,
  setShowModal,
  onClose,
  user,
  onProductAdded,
}) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [unitCount, setUnitCount] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const [file, setFile] = useState(null);
  const [alpha, setAlpha] = useState(null);
  const [modifier, setModifier] = useState(null);
  const [accent, setAccent] = useState(null);
  const [legend, setLegend] = useState(null);

  const onCreate = async () => {
    try {
      console.log("--------------creating a product--------------");
      let nextProdId = await Products.next();
      console.log("(addprodform)new prod id:", nextProdId);
      let vendor = await Vendors.getVendorByAccountId(user?.account_id);
      let vendor_id = vendor.vendor_id;
      console.log("(addprodform)vendor_id:", vendor_id);
      if (file) {
        let updatedFile = new File([file], `product_${nextProdId}`, {
          type: file.type,
          lastModified: file.lastModified,
        });

        let results = await fFile.create(updatedFile);
        if (results.status === 200) {
          toast.success("File uploaded successfully");
          setShowModal(false);
        }
      } else {
        console.log("No file selected");
      }

      const data = {
        vendor_id: vendor_id,
        name: productName,
        price: productPrice,
        description: productDescription,
        image_data: file
          ? `${API_URL[0]}/images/product_${nextProdId}.jpg`
          : null,
        unit_count: unitCount,
        alpha: alpha,
        modifier: modifier,
        accent: accent,
        legend: legend,
      };

      let results = await Products.create(data);

      if (results.status === 201) {
        toast.success("Product added successfully");
        onProductAdded(); // Call the callback
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
    console.log("Selected file:", selectedFile);
  };

  return (
    <>
      {showModal && (
        <div className="absolute top-0 left-0 flex w-full min-h-screen bg-black/70 z-50">
          <div className="flex md:items-center md:justify-center w-full">
            <div className="bg-white h-fit p-8 rounded w-full md:w-1/2 flex flex-col gap-y-2">
              <label className="font-semibold mb-4">Add Product</label>

              <div className="flex">
                <textarea
                  className="textarea w-5/6 bg-white resize-none"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                  placeholder="Product Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <textarea
                  className="textarea textarea-bordered w-full bg-white"
                  placeholder="Product Description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <input
                  type="number"
                  className="input input-bordered w-full bg-white"
                  placeholder="Unit Count"
                  value={unitCount}
                  onChange={(e) => setUnitCount(e.target.value)}
                />
              </div>

              <input
                type="file"
                className="file-input file-input-xs file-input-success bg-white w-full"
                onChange={handleFileChange}
              />

              <div className="mb-4">
                <select
                  className="select select-bordered w-full bg-white"
                  value={alpha}
                  onChange={(e) => setAlpha(e.target.value)}
                >
                  <option value={null}>Select Alpha Color</option>
                  {Object.entries(Colors).map(([key, color]) => (
                    <option key={key} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <select
                  className="select select-bordered w-full bg-white"
                  value={modifier}
                  onChange={(e) => setModifier(e.target.value)}
                >
                  <option value={null}>Select Modifier Color</option>
                  {Object.entries(Colors).map(([key, color]) => (
                    <option key={key} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <select
                  className="select select-bordered w-full bg-white"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                >
                  <option value={null}>Select Accent Color</option>
                  {Object.entries(Colors).map(([key, color]) => (
                    <option key={key} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <select
                  className="select select-bordered w-full bg-white"
                  value={legend}
                  onChange={(e) => setLegend(e.target.value)}
                >
                  <option value={null}>Select Legend Color</option>
                  {Object.entries(Colors).map(([key, color]) => (
                    <option key={key} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex w-full justify-center">
                {file && (
                  <img
                    src={imageURL}
                    alt="Product Preview"
                    className="flex w-1/4 rounded border-2"
                  />
                )}
              </div>

              <div className="flex justify-end gap-x-4 mt-5">
                <button
                  className="btn btn-sm btn-success text-white"
                  onClick={onCreate}
                >
                  Add Product
                </button>
                <button
                  className="btn btn-sm btn-error text-white"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductForm;
