import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Products from "@/functions/Products";
import Vendors from "@/functions/Vendors";
import toast from "react-hot-toast";

const ProductDetails = ({ user }) => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    unit_count: 0,
  });

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const productData = await Products.getProductById(productId);
      console.log(
        "(ProdDetails) vendor_id of the product:",
        productData.vendor_id
      );
      console.log("(ProdDetails) account_id of the user:", user.account_id);
      const userVendor = await Vendors.getVendorByAccountId(user.account_id);
      console.log("(ProdDetails) vendor_id of the user:", userVendor.vendor_id);
      if (productData.vendor_id == userVendor.vendor_id) {
        setProduct(productData);
        setFormData({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          unit_count: productData.unit_count,
        });
        setLoading(false);
      } else {
        // Display a toast notification if the user's vendor ID does not match the product's vendor ID
        toast.error("User's Vendor ID does not match the product's Vendor ID");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedProduct = { ...product, ...formData };
      const response = await Products.update(updatedProduct);

      if (response.status === 200) {
        setProduct(updatedProduct);
        toast.success("Product updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await Products.delete(productId);

      if (response.status === 200) {
        toast.success("Product deleted successfully");
        router.push("/account/manage"); // Redirect to the products list page
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log(product);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Product Details for: {product.name}
      </h1>
      {/* temporarily removed the image */}
      {/* <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      /> */}
      {isEditing ? (
        <div>
          <label htmlFor="" className="font-semibold">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border bg-white rounded-lg"
          />
          <label htmlFor="" className="font-semibold">
            Unit Cost
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border bg-white rounded-lg"
          />
          <label htmlFor="" className="font-semibold">
            Product Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border bg-white rounded-lg"
          ></textarea>
                    <label htmlFor="" className="font-semibold">Quantity</label>
          <input
            type="number"
            name="unit_count"
            value={formData.unit_count}
            onChange={handleChange}
            className="block w-full p-2 mb-2 border bg-white rounded-lg"
          />
          <button onClick={handleEdit} className="btn btn-primary mr-2">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-2">Price: ${product.price}</p>
          <p className="text-lg mb-2">Units Remaining: {product.unit_count}</p>
          <p className="text-lg mb-2">Description: {product.description}</p>
          <p>
            Image: <img className="w-fit" src={product?.image_data} />
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-success mr-2"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-warning mr-2">
            Delete
          </button>
          <button onClick={() => router.back()} className="btn btn-dark mt-2">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
