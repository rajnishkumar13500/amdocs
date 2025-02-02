const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
if (!BASE_API_URL) {
  console.error("Base API URL is not defined in environment variables");
}

export const apiRoot = {
  baseAPI: BASE_API_URL || "http://localhost:3000/api",
};

// api versions
export const apiVersionControl = {
  v1: "/v1",
  v2: "/v2",
};

// url constructor
export const constructURL = (rootKey, version, endpoint) => {
  return `${rootKey}${version}${endpoint}`;
};
