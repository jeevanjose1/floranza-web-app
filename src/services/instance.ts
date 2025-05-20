import axios  from "axios";
import Cookies from "js-cookie";

export const base_url = process.env.BASE_URL;

const instance = axios.create({
  baseURL: base_url,
  headers:{
    'Content-Type':'application/json'
  }
});

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("floranza-t-value");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default instance;
