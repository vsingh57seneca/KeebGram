const axios = require ("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
    create: async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
      
            try {
              const response = await axios.post(`${API_URL[DEBUG]}/api/images/create`, formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
              });
              console.log(response);
              return response;
          } catch (error) {
              console.error(error);
              return error;
          }
          } else {
            console.log("No file selected");
          }
    }
}