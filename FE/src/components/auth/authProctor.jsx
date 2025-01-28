import { Navigate } from "react-router-dom";
import { getUserInfo } from "./auth.service";

const AuthProctor = ({ children }) => {
  const userInfo = getUserInfo();
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthProctor;
