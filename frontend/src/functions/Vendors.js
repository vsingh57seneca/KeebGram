const axios = require("axios");

module.exports = {
    getAll: async () => {
        let url = `http://localhost:3001/api/vendors/getAll`;
    
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
          console.error("Error fetching applications", error);
        }
      },

    create: async (vendor) => {
        try {
            if(!vendor) {
                return ("All fields required");
            }

            let reqOptions = {
                url: "http://localhost:3001/api/vendors/create",
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
          "http://localhost:3001/api/vendors/delete",
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
          "http://localhost:3001/api/vendors/approve",
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