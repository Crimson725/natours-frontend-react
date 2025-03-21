const SERVER_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "https://natours-2p2d.onrender.com";
export { SERVER_BASE_URL };
