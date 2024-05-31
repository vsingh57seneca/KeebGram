const axios = require("axios");

module.exports = {
  getOne: async (email) => {
    if (!email) {
      console.error("No email provided");
      return;
    }

    // Construct the URL with the email parameter
    let url = `http://localhost:3001/api/accounts/getOneByEmail?email=${email}`;

    try {
      // Send a GET request to the server
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
      url: "http://localhost:3001/api/accounts/update",
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
      return response // return only the data
    } catch (error) {
      console.error("Error updating user:", error);
      return "Failed to update user";
    }
  },

  delete : async (email) => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/accounts/delete",
        {
          params: {
            email: email, // Pass the email as a query parameter
          },
        }
      );

      // Handle different response status codes
      if (response.status === 200) {
        return response
      } else {
        console.error("Unexpected status code:", response.status);
        // Handle other unexpected status codes
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error deleting account:", error);
    }
  }
};
