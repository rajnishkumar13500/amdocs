import { getUserInfo } from "../auth/auth.service";

const UserDashboard = () => {
  const userInfo = getUserInfo();
  console.log(userInfo);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userInfo.name}!</h1>
      <div>
        <p>Email: {userInfo.email}</p>
        <p>User ID: {userInfo.userId}</p>
      </div>
    </div>
  );
};

export default UserDashboard;
