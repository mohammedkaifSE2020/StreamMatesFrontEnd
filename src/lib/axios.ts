import axios from "axios"

const BaseURL = import.meta.env.VITE_MODE === "development" ? "http://localhost:3000/api" : "https://streammatesbackend.onrender.com/api"
console.log(BaseURL)
export const axiosInstance = axios.create({
    baseURL : BaseURL,
    withCredentials: true,
})