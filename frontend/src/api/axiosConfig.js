import axios from "axios";

const VITE_BACKEND_URL= import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: VITE_BACKEND_URL, // Adjust this to your backend's URL
  withCredentials: true, // Include cookies in requests if needed
});




export default instance;
