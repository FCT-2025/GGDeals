export const Config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5050/api/ggdeal",
  AUTH: {
    LOGIN: import.meta.env.VITE_API_AUTH_URL_LOGIN || "http://localhost:5050/api/auth/login",
    REGISTER: import.meta.env.VITE_API_AUTH_URL_REGISTER || "http://localhost:5050/api/auth/register",
    TOKEN: import.meta.env.VITE_API_AUTH_URL_TOKEN || "http://localhost:5050/api/auth/token",
    LOGOUT: import.meta.env.VITE_API_AUTH_URL_LOGOUT || "http://localhost:5050/api/auth/logout",
  }
};
