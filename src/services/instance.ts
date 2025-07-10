import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const base_url = process.env.BASE_URL;

const instance = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json'
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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response && error.response.status === 401) {
      handleLogout()
    }
    return Promise.reject(error);
  }
);
function handleLogout() {
  Cookies.remove("floranza-t-value");
  localStorage.clear();
  sessionStorage.clear();
  toast.error("Session expired, please login again.");
  setTimeout(() => {
    window.location.replace('/')
  }, 1000);
}

export default instance;
