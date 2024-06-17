const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
  getLikesCount: async (postId) => {
    if (!postId) {
      console.error("Post ID missing");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/likes/getLikesCount?post_id=${postId}`;

    try {
      // Send a GET request to the server
      let response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },
  
  add: async (postId, accountId) => {
    try {
      if (!postId) {
        return "Post ID missing";
      }
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/likes/add`,
        method: "POST",
        data: {
            post_id: postId,
            account_id: accountId,
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