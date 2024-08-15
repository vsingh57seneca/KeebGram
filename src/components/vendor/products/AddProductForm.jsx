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
        console.log(file);
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
          {/* The button to open modal */}
          <label
            htmlFor="add-product-modal"
            className="btn btn-sm btn-success text-white"
          >
            Add New Product
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="add-product-modal" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box bg-white">
              <h3 className="text-lg font-bold">Add New Product</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Product Name</h1>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-sm w-full bg-white border-black"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Product Price</h1>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-sm w-full bg-white border-black"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Product Description</h1>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-sm w-full bg-white border-black"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Unit Count</h1>
                  </div>
                  <input
                    type="number"
                    min={1}
                    placeholder="Type here"
                    className="input input-bordered input-sm w-full bg-white border-black"
                    value={unitCount}
                    onChange={(e) => setUnitCount(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <h1>Image</h1>
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-xs file-input-success bg-white w-full"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Alpha</h1>
                  </div>
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
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Modifier</h1>
                  </div>
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
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Accent</h1>
                  </div>
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
                <div className="col-span-1">
                  <div className="flex items-center">
                    <h1>Legend</h1>
                  </div>
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
              </div>
              <div className="modal-action">
                <label
                  className="btn btn-success btn-sm text-white"
                  onClick={onCreate}
                >
                  Add Product
                </label>
                <label
                  htmlFor="add-product-modal"
                  className="btn btn-error btn-sm text-white"
                >
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
  );
};

export default AddProductForm;
