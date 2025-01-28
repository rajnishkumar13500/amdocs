import { useEffect, useState } from "react";
import { getUserInfo } from "../auth/auth.service";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial user info
    const currentUser = getUserInfo();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUserInfo(currentUser);
  }, [navigate]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome, {userInfo.name}!
        </h1>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-600">
              Email: <span className="text-gray-800">{userInfo.email}</span>
            </p>
            <p className="text-gray-600">
              User ID: <span className="text-gray-800">{userInfo.userId}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
