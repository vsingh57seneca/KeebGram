const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
  getAll: async () => {
    let url = `${API_URL[DEBUG]}/api/accounts/getAll`;

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
      console.error("Error fetching users", error);
    }
  },

  getOne: async (email) => {
    if (!email) {
      console.error("No email provided");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/accounts/getOneByEmail?email=${email}`;

    try {
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  },

  getOneById: async (id) => {
    if (!id) {
      console.error("No Id provided");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/accounts/getOneById?id=${id}`;

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
      console.error("Error fetching user data", error);
    }
  },

  create: async (user) => {
    try {
      if (!user?.email || !user?.password) {
        return "All fields are required";
      }

      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/accounts/create`,
        method: "POST",
        data: {
          email: user?.email,
          password: user?.password,
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

  update: async (updatedUser) => {
    if (
      !updatedUser.firstName ||
      !updatedUser.lastName ||
      !updatedUser.displayName ||
      !updatedUser.country ||
      !updatedUser.language ||
      !updatedUser.gender ||
      !updatedUser.birthdate
    ) {
      return "All fields required";
    }

    let reqOptions = {
      url: `${API_URL[DEBUG]}/api/accounts/update`,
      method: "POST",
      data: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        displayName: updatedUser.displayName,
        country: updatedUser.country,
        birthdate: updatedUser.birthdate,
        gender: updatedUser.gender,
        language: updatedUser.language,
        email: updatedUser.email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios(reqOptions);
      return response; // return only the data
    } catch (error) {
      console.error("Error updating user:", error);
      return "Failed to update user";
    }
  },

  delete: async (email) => {
    try {
      const response = await axios.delete(
        `${API_URL[DEBUG]}/api/accounts/delete`,
        {
          params: {
            email: email, // Pass the email as a query parameter
          },
        }
      );

      // Handle different response status codes
      if (response.status === 200) {
        return response;
      } else {
        console.error("Unexpected status code:", response.status);
        // Handle other unexpected status codes
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error deleting account:", error);
    }
  },

  // New functions added below:

  getProductsByVendorId: async (vendor) => {
    if (!vendor) {
      console.error("No vendor ID provided");
      return;
    }
    const vendorId = vendor.vendor_id; // ensure vendor_id is a string or number
    console.log("vendor id given:", vendorId);
    let url = `${API_URL[DEBUG]}/api/products/getByVendorId?vendorId=${vendorId}`;

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
      console.error("Error fetching products", error);
    }
  },

  getProductById: async (productId) => {
    if (!productId) {
      console.error("No product ID provided");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/products/getById?productId=${productId}`;

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

  deleteProduct: async (productId) => {
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

  addProduct: async (product) => {
    try {
      const response = await axios.post(
        `${API_URL[DEBUG]}/api/products/createProduct`,
        product
      );
      return response;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  getVendorByAccountId: async (accountId) => {
    if (!accountId) {
      console.error("No account ID provided");
      return null; // Ensure null is returned if no ID is provided
    }

    let url = `${API_URL[DEBUG]}/api/vendors/getByAccountId?account_id=${accountId}`;

    try {
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data; // Ensure the vendor ID is returned
      }
    } catch (error) {
      console.error("Error fetching vendor data", error);
      return null; // Return null in case of error
    }
  },
};
