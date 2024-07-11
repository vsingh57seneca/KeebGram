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

  
  getOne: async (comment_id) => {
    let url = `${API_URL[DEBUG]}/api/comments/get/${comment_id}`;

    try {
      let response = await axios.get(url);
      if (response.status === 200) {
        return response.data[0];
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

  edit: async (comment) => {
    try {
      if (!comment?.content || comment.content.length === 0) {
        return "Content cannot be empty";
      }
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/comments/edit/${comment?.comment_id}`,
        method: "POST",
        data: comment,
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

  delete: async (comment_id) => {
    console.log(comment_id)
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/comments/delete`,
        method: "POST",
        data: {
          comment_id: comment_id
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
