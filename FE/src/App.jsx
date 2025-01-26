import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

// Temporary placeholder components
const Home = () => <h1 className="text-2xl font-bold">Home Page</h1>;
const About = () => <h1 className="text-2xl font-bold">About Page</h1>;
const Courses = () => <h1 className="text-2xl font-bold">Courses Page</h1>;
const Login = () => <h1 className="text-2xl font-bold">Login Page</h1>;
const Profile = () => <h1 className="text-2xl font-bold">Profile Page</h1>;

export default App;
