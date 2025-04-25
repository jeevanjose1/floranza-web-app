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
    const token = JSON.parse(Cookies.get("token") as string);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default instance;
