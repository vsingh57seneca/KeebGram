const axios = require ("axios");

module.exports = {
    create: async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
      
            try {
              const response = await axios.post('http://localhost:3001/api/images/create', formData, {
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