const SERVER_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3000";
export { SERVER_BASE_URL };
