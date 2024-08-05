const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
    getAll: async () => {
      let url = `${API_URL[DEBUG]}/api/reports/getAll`;
  
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

    getOne: async (reports_id) => {
        let url = `${API_URL[DEBUG]}/api/posts/get/${reports_id}`;
    
        try {
          let response = await axios.get(url);
          if (response.status === 200) {
            return response.data[0];
          }
        } catch (error) {
          return error;
        }
      },
};