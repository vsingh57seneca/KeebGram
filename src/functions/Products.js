const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
  getProductsByVendorId: async (vendorId) => {
    if (!vendorId) {
      console.error("No vendor ID provided");
      return;
    }
    console.log("(products.js)vendor id given:", vendorId);
    let url = `${API_URL[DEBUG]}/api/products/getProductsByVendorId?vendorId=${vendorId}`;

    try {
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("(products.js)products:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  },

  getProductById: async (productId) => {
    if (!productId) {
      console.error("No product ID provided");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/products/getProductById?productId=${productId}`;

    try {
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching product", error);
    }
  },

  //Gets the next post_id available to create
  next: async () => {
    let url = `${API_URL[DEBUG]}/api/products/next`;

    try {
      // Send a GET request to the server
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data?.nextId;
      }
    } catch (error) {
      return error;
    }
  },

  delete: async (productId) => {
    try {
      const response = await axios.delete(
        `${API_URL[DEBUG]}/api/products/delete`,
        {
          params: { productId },
        }
      );

      if (response.status === 200) {
        return response;
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  },

  create: async (product) => {
    console.log(product);
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/products/create`,
        method: "POST",
        data: {
          product_id: product.product_id,
          vendor_id: product.vendor_id,
          name: product.name,
          price: product.price,
          description: product.description,
          image_data: product.image_data,
          unit_count: product.unit_count,
          alpha: product.alpha,
          modifier: product.modifier,
          accent: product.accent,
          legend: product.legend,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await axios.request(reqOptions);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  update: async (product) => {
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/products/update`,
        method: "PUT",
        data: {
          product_id: product.product_id,
          name: product.name,
          description: product.description,
          price: product.price,
          unit_count: product.unit_count,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await axios.request(reqOptions);
      return response;
    } catch (error) {
      return error;
    }
  },
};
