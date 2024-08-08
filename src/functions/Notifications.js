const axios = require('axios');
import { DEBUG, API_URL } from '../../config';

module.exports = {
    create: async (data) => {
        try {
            let reqOptions = {
                url: `${API_URL[DEBUG]}/api/notifications/create`,
                method: 'POST',
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
            };

            let response = await axios.request(reqOptions);
            return response
        } catch (error) {
            return error;
        }
    },

    getUserNotifications: async (account_id) => {
        try {
            if(!account_id) {
                console.error("Invalid Account ID")
                return
            }

            let url = `${API_URL[DEBUG]}/api/notifications/getUserNotifications?account_id=${account_id}`;

            console.log(account)
            let response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.status === 404) {
                return null
            } else {
                return response;
            }
        } catch (error) {
            return error
        }
    },

    markUserNotificationsRead: async (account_id) => {
        try {
            if(!account_id) {
                console.error("Invalid Account ID")
                return
            }

            let url = `${API_URL[DEBUG]}/api/notifications/markUserNotificationsRead?account_id=${account_id}`;

            let response = await axios.put(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response
        } catch (error) {
            return error
        }
    },

    delete: async (notification_id) => {
        try {
            if (!notification_id) {
                console.error("Invalid notificaion id")
                return
            }

            let url = `${API_URL[DEBUG]}/api/notifications/delete?notification_id=${notification_id}`;

            let response = await axios.delete(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response
        } catch (error) {
            return error
        }
    }
}