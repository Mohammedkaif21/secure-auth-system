import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    (response) => {
        console.log(response);
        return response
    },
    (error) => {
        console.log(error);

        if (error.response?.status === 401) {
            console.log("Unauthorized - maybe token expired");
        }
        return Promise.reject(error);
    }
);

export default api