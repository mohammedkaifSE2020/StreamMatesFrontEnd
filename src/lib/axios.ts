import axios from "axios"

const BaseURL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api"

export const axiosInstance = axios.create({
    baseURL : BaseURL,
    withCredentials: true,
})