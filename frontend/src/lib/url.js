export const VITE_API_URL =
  typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.hostname}:4000`
    : "";
