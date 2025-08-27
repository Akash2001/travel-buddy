import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        Accept: "application/json",
        // Authorization: process.env.REACT_APP_FSQ_API_KEY,
    },
});