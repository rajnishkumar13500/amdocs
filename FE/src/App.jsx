import { Routes, Route } from "react-router-dom";
import Footer from "./components/shared/footer";
import Navbar from "./components/shared/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import CourseDetails from "./pages/CourseDetails";
import Courses from "./components/course/coursePage";
import Details from "./components/userInfo/details";
import SkillInfo from "./components/userInfo/userSkillinfo";
import About from "./components/pages/about"; 
import Home from "./components/pages/home";
import UserDashboard from "./components/dashboard/userDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Details />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/skill-info" element={<SkillInfo />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// Temporary placeholder components
// const Home = () => <h1 className="text-2xl font-bold">Home Page</h1>;
const Profile = () => <h1 className="text-2xl font-bold">Profile Page</h1>;

export default App;
