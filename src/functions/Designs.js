const axios = require("axios");
import {DEBUG, API_URL} from "../../config";

module.exports = {
    getAllDesigns: async () => {
        let url = `${API_URL[DEBUG]}/api/designs/getAll`;
        try {
            let response = await axios.get(url);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching all designs", error);
        }
    },

    getDesignsByUserId: async (userId) => {
        if (!userId) {
            console.error("No user ID provided");
            return;
        }

        let url = `${API_URL[DEBUG]}/api/designs/user/${userId}`;
        try {
            let response = await axios.get(url);
            if (response.status === 200 || response.status === 201) {
                return response.data;
            }
        } catch (error) {
            console.error("Error fetching designs for user", error);
        }
    },

    createDesign: async (design) => {
        let url = `${API_URL[DEBUG]}/api/designs/create`;
        try {
            let response = await axios.post(url, design);
            return response;
        } catch (error) {
            console.error("Error creating design", error);
        }
    },

    updateDesign: async (design) => {
        let url = `${API_URL[DEBUG]}/api/designs/update`;
        try {
            let response = await axios.put(url, design);
            return response;
        } catch (error) {
            console.error("Error updating design", error);
        }
    },

    deleteDesign: async (designId) => {
        let url = `${API_URL[DEBUG]}/api/designs/delete/${designId}`;
        try {
            let response = await axios.delete(url);
            return response;
        } catch (error) {
            console.error("Error deleting design", error);
        }
    },

    next: async () => {
        let url = `${API_URL[DEBUG]}/api/designs/next`;

        try {
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
