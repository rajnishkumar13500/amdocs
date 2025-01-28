import { jwtDecode } from "jwt-decode";

const authKey = "token";

export const setLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  localStorage.setItem(key, token);
};

const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const storeUserInfo = (token) => {
  setLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

export const isLoggedIn = () => {
  return getUserInfo() !== null;
};

export const loggedOut = () => {
  localStorage.removeItem(authKey);
};
