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

  registerGoogleAccount: async (data) => {
    let reqOptions = {
      url: `${API_URL[DEBUG]}/api/accounts/registerGoogleAccount`,
      method: "POST",
      data: {
        data,
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
      return error;
    }
  },

  verify: async (token) => {
    let reqOptions = {
      url: `${API_URL[DEBUG]}/api/accounts/verify`,
      method: "POST",
      data: {
        token: token.replace('token=', ''),
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios(reqOptions);
      return response;
    } catch (error) {
      return error;
    }
  },
};
