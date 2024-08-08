const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
  getAll: async () => {
    let url = `${API_URL[DEBUG]}/api/posts/getAll`;

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

  getOne: async (post_id) => {
    let url = `${API_URL[DEBUG]}/api/posts/get/${post_id}`;

    try {
      let response = await axios.get(url);
      if (response.status === 200) {
        return response.data[0];
      }
    } catch (error) {
      return error;
    }
  },

  getLiked: async (account_id) => {
    let url = `${API_URL[DEBUG]}/api/posts/getLiked?account_id=${account_id}`;

    try {
      let response = await axios.get(url);

      if (response.status === 200) {
        console.log(response.data);
        return response.data[0];
      }
    } catch (error) {
      return error;
    }
  },

  getReported: async () => {
    let url = `${API_URL[DEBUG]}/api/posts/getReported`;

    try {
      let response = await axios.get(url);

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      return error;
    }
  },

  create: async (post) => {
    console.log(post);
    try {
      if (!post?.content_text || post.content_text.length === 0) {
        return "Content cannot be empty";
      }

      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/posts/create`,
        method: "POST",
        data: {
          account_id: post.account_id,
          content_text: post.content_text,
          content_image: post.content_image,
          created_at: post.created_at,
          design_id: post.design_id
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

  edit: async (post) => {
    try {
      if (!post?.content_text || post.content_text.length === 0) {
        return "Content cannot be empty";
      }
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/posts/edit/${post?.post_id}`,
        method: "POST",
        data: post,
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

  setReported: async (post_id, report_id) => {
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/posts/setReported/${post_id}`,
        method: "POST",
        data: {
          "post_id": post_id, 
          "report_id": report_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await axios.request(reqOptions);
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  removeReport: async (post_id) => {
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/posts/removeReport`,
        method: "POST",
        data: {
          post_id: post_id
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

  delete: async (post_id) => {
    try {
      let reqOptions = {
        url: `${API_URL[DEBUG]}/api/posts/delete`,
        method: "POST",
        data: {
          post_id: post_id
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

  //Gets the next post_id available to create
  next: async () => {
    let url = `${API_URL[DEBUG]}/api/posts/next`;

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
};
