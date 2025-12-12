import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL ,
    withCredentials: true
})

api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    const status = error.response?.status;
    switch (status) {
      case 400:
        console.error("Bad Request:", error.response.data?.message);
        break;
      case 401:
        console.error("Unauthorized — Redirecting to login...");
        break;
      case 403:
        console.error("Forbidden — Access denied");
        break;
      case 404:
        console.error("Resource Not Found");
        break;
      case 409:
        console.error("Conflict Error");
        break;
      case 500:
        console.log(error)
        console.error("Server Error — Try again later");
        break;
      default:
        console.error("Unexpected Error-", error.response.data);
    }

    return Promise.reject(error.response.data); // Still reject so the calling function can handle if needed
  }
);