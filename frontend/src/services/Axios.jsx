import axios from "axios"
import userAPI from "../API/userAPI";

class Axios {
    constructor() {
        axios.defaults.baseURL = "http://localhost:3000/API/";
        axios.defaults.headers.post['Accept'] = 'application/json';
    }

    async getAPI(auth, API, param) {
        try {
            const config = {
                params: param || {}
            };

            if (auth) {
                const token = localStorage.getItem("tokenGHA"); // or from variable
                config.headers = {
                    Authorization: `Bearer ${token}`
                };
                config.params.email = userAPI.userId
            }

            console.log("-------------------------")
            console.log(config)
            const response = await axios.get(API, config);
            return response.data;

        } catch (error) {
            console.error('Error in getAPI:', error.response?.data || error.message);
            return error.response?.data || { message: "Request failed" };
        }
    }

    async postAPI(auth, API, apiData, param) {
        try {
            const config = {
                params: param || {},
                headers: {
                    'Content-Type': 'application/json' // Set this explicitly
                }
            };

            if (auth) {
                const token = localStorage.getItem("tokenGHA");
                config.headers.Authorization = `Bearer ${token}`;
                config.params.userId = userAPI.userId
            }

            const response = await axios.post(API, apiData, config);
            return response.data;

        } catch (error) {
            console.error('Error in postAPI:', error.response?.data || error.message);
            return error.response?.data || { message: "Request failed" };
        }
    }


    async putAPI(auth, API, apiData, param) {
        try {
            const config = {
                params: param || {}
            };

            // ✅ Attach token if auth required
            if (auth) {
                const token = localStorage.getItem("tokenGHA");

                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    };
                }
                config.params.userId = userAPI.userId
            } else {
                config.headers = {
                    "Content-Type": "application/json"
                };
            }

            const response = await axios.put(API, apiData, config);
            return response.data;

        } catch (error) {
            console.error("Error in putAPI:", error.response?.data || error.message);
            return error.response?.data || { message: "Request failed" };
        }
    }

    async fileUploadAPI(presignedUrl, file) {
        try {
            const response = await axios.put(
                presignedUrl,
                file,
                {
                    headers: {
                        "Content-Type": file.type,
                    },
                    withCredentials: false,
                }
            );

            return { success: true, response };

        } catch (error) {
            console.error(
                "Error in fileUploadAPI:",
                error.response?.data || error.message
            );
            return {
                success: false,
                message: error.response?.data || "File upload failed"
            };
        }
    }
}

const apiHandler = new Axios()
export default apiHandler