// src/config/config.ts
export const Config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5050/api/ggdeal/",
  API_AUTH_URL:  import.meta.env.VITE_API_URL || "http://localhost:5050/api/auth/",
};
