const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
  getAll: async (post_id) => {
    let url = `${API_URL[DEBUG]}/api/comments/getAll?post_id=${post_id}`;

    try {
      // Send a GET request to the server
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  create: async (comment) => {
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/comments/create`,
        method: "POST",
        data: {
          comment:comment
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
