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

  isPostLiked: async (postId, accountId) => {
    if (!postId || !accountId) {
      console.error("Post ID or Account ID missing");
      return;
    }

    let url = `${API_URL[DEBUG]}/api/likes/isPostLiked?post_id=${postId}&account_id=${accountId}`;

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

  delete: async (postId, accountId) => {
    try{
      if (!postId || !accountId) {
        console.error("Post ID or Account ID missing");
        return;
      }
      const response = await axios.delete(
        `${API_URL[DEBUG]}/api/likes/delete`,
        {
          params: {
            post_id: postId,
            account_id: accountId,
          },
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        console.error("Unexpected status code:", response.status);
        // Handle other unexpected status codes
      };
    } catch(error) {
      console.error("Error deleting account:", error);
    };
  },
};