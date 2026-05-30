import axios from "axios";

// On the client, we use relative paths to avoid port/host mismatches
// On the server, we might need a full URL
const isServer = typeof window === "undefined";
const baseURL = isServer
  ? (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  : "";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
