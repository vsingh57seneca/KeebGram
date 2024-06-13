const axios = require("axios");

module.exports = {
  getAll: async () => {
    let url = "http://localhost:3001/api/posts/getAll";

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
        return error
      }
  },

  create: async (post) => {
    console.log(post);
      try {
        if (!post?.content_text || post.content_text.length === 0) {
            return "Content cannot be empty";
        }

        let reqOptions = {
            url: "http://localhost:3001/api/posts/create",
            method: "POST",
            data: {
                account_id: post.account_id,
                content_text: post.content_text,
                content_image: post.content_image,
                created_at: post.created_at
            },
            headers: {
                "Content-Type": "application/json",
            },
        };

        let response = await axios.request(reqOptions);
        return response;
        
    } catch (error) {
        return (error);
    }
  },

  next: async () => {
    let url = "http://localhost:3001/api/posts/next";

    try {
        // Send a GET request to the server
        let response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
 
        if (response.status === 200) {
          return response.data?.nextId
        }
      } catch (error) {
        return error
      }
  },
};
