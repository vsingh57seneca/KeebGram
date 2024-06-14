const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
    getAll: async () => {
        let url = `${API_URL[DEBUG]}/api/vendors/getAll`;
    
        try {
          let response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (response.status === 200) {
            return response.data
          }
        } catch (error) {
          return error;
        }
      },

    create: async (vendor) => {
        try {
            if(!vendor) {
                return ("All fields required");
            }

            let reqOptions = {
                url: `${API_URL[DEBUG]}/api/vendors/create`,
                method: "POST",
                data: {
                    vendor: vendor
                },
                headers: {
                    "Content-Type": "application/json", 
                },
            };
            
            let response = await axios.request(reqOptions);
            return(response);
        } catch (error) { 
            return(error);
        }
    },

    delete: async (application) => {
      try {
        console.log(application)
        const response = await axios.post(
          `${API_URL[DEBUG]}/api/vendors/delete`,
          {
            application: application, // Pass the application data in the body
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
        console.error("Error deleting application: ", error);
      }
    },

    approve: async (application_id) => {
      try {
        const response = await axios.post(
          `${API_URL[DEBUG]}/api/vendors/approve`,
          {
            application_id: application_id
          }
        );

        return response;
      } catch (error) {
        return error
      }
    }
}