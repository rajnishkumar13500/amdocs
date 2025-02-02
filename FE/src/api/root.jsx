export const apiRoot = {
  baseAPI: "http://localhost:3000/api",
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
