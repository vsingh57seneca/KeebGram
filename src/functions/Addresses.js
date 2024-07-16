const axios = require("axios");
import { DEBUG, API_URL } from "../../config";

module.exports = {
    getAddressByAccountId: async (accountId) => {
        if (!accountId) {
            console.error("No account ID provided");
            return null;
          }

        let url = `${API_URL[DEBUG]}/api/addresses/getAddressByAccountId?account_id=${accountId}`;

        try {
            let response = await axios.get(url, {
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error("(addresses.js)Error fetching vendor address data", error);
            return null;
        }
    },

    update: async (updatedAddress) => {
        if (
            !updatedAddress.account_id ||
            !updatedAddress.address_line ||
            !updatedAddress.city ||
            !updatedAddress.stprov ||
            !updatedAddress.postal
        ) {
            return "All fields required";
          }

          let reqOptions = {
            url: `${API_URL[DEBUG]}/api/addresses/update`,
            method: "POST",
            data: {
              account_id: updatedAddress.account_id,  
              address_line: updatedAddress.address_line,
              city: updatedAddress.city,
              stprov: updatedAddress.stprov,
              postal: updatedAddress.postal,
            },
            headers: {
              "Content-Type": "application/json",
            },
          };
      
          try {
            let response = await axios(reqOptions);
            return response; // return only the data
          } catch (error) {
            console.error("Error updating user:", error);
            return "Failed to update user";
          }
    }
};